/*

QWT = token
QWT 借鉴JWT思路优化分为 头 身 尾 三部

头部标识秘钥的应用场景 加密类型

身部包含要存的内容(必须包含_id:mongoDB中的_ID) 过期时间 
和 redis中的key (qy+mongoDB中的_ID)
redis中的key存了其诞生时间 
一旦用户重新创建了token则上一个token失效实现token唯一性

尾部 是头部和身部加密后的结果加盐的md5值 加明显标识
在中间件层面可先用尾部校验正确性
再用过期时间校验是否过期
最后读取redis校验唯一性

OS:使用现有的jwt库太烦了 有空撸一个吧...
by qy 2021 12 15

*/

'use strict';

const Service = require('egg').Service;

class QWTService extends Service {

    /*
     *   生成QWT
     *-> yscene 应用场景
     *-> data   token存的内容 
     *-> redisId 一般为mongo中的_ID
     *-> endms  多少毫秒后过期

     *=> QWT | false(生成QWT失败)
    */
    async createQWT(yscene, data, redisId, endms = 604800000) {
        let { ctx, config } = this
        try {
            // HEAD密文
            let encHEAD = ctx.helper.getMd5(this.HEAD(yscene))
            // BODY密文
            let encBODY = ctx.helper.getRSA(this.BODY(data, endms, redisId), config.PRIVATE_KEY)
            // TAIL密文
            let encTAIL = this.TAIL(encHEAD, encBODY)

            return encBODY + encHEAD + encTAIL + '=>qy'
        } catch (err) {
            console.log(err)
            throw '操作失败'
        }
    }


    /*
     * 解析QWT
     *-> 应用场景
     *-> QWT
     *=> ctx上挂载token存的内容 true | false (QWT过期或伪造)
    */
    async parseQWT(yscene, QWT) {
        let { ctx } = this
        // QWT由32位头+随机位身+32位尾组成
        QWT = QWT.toString()
        if (!QWT || QWT.length < 64) throw '长度校验失败'
        let qwtLength = QWT.length
        // 解析获取到的 H B T
        let getHEAD = QWT.substring(qwtLength - 68, qwtLength - 36)
        let getBODY = QWT.substring(0, qwtLength - 68)
        let getTAIL = QWT.substring(qwtLength - 36, qwtLength - 4)
        // 尾部合理性判断
        if (QWT.substring(qwtLength - 4) !== '=>qy') throw '格式校验失败'
        let encTAIL = this.TAIL(getHEAD, getBODY)
        if (encTAIL !== getTAIL) throw '尾部校验失败'
        // 头部校验
        let encHEAD = ctx.helper.getMd5(this.HEAD(yscene))
        if (encHEAD !== getHEAD) throw '头部校验失败'
        // 解析身
        let { data, endTime, ...redisID } = JSON.parse(ctx.helper.RSAget(getBODY))
        // 超时验证
        if (endTime <= new Date().getTime()) throw '超时失效'
        // 唯一性验证
        let { _id } = data
        _id = 'qy' + _id
        let pass = await this.app.redis.get(_id)
        if (!pass) throw '唯一性验证失败'
        let getPass = redisID[_id]
        if (getPass !== pass) throw '唯一性验证失败'

        // data挂载ctx
        ctx.data = data
    }


    /* 创建头 
     *-> yscene token应用场景
    */
    HEAD = yscene => {
        if (!yscene) {
            throw '需申明应用场景'
        };
        return JSON.stringify({
            name: 'QWT',
            scene: yscene
        })
    }

    /* 创建身 
     *-> data  token存的内容 
     *-> endms 多少毫秒后过期 默认7天
     *-> redisId 一般为qy+mongo中的_ID
    */
    BODY = async (data, endms = 604800000, redisID) => {
        if (!data || isNaN(endms)) {
            throw '需提供有效内容'
        };
        redisID = 'qy' + redisID
        let nowss = Date.parse(new Date())
        await this.app.redis.set(redisID, nowss)
        return JSON.stringify({
            data,
            endTime: nowss + endms,
            [redisID]: nowss
        })
    }

    /* 创建尾
     *-> H HEAD加密后的结果
     *-> B BODY加密后的结果
    */
    TAIL = (H, B) => {
        return this.ctx.helper.getMd5(H + B, this.config.keys)
    }

}
module.exports = QWTService;