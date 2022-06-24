'use strict';

const Service = require('egg').Service;
const crypto = require("crypto");

class OSSService extends Service {

    /*
     * 前端直传1.用户获取policy
     *-> mail     * 用户邮箱
     *-> zjId       造极id
     *-> dirPath    授权目录 || 授权目录/文件名
     *=> policy
    */
    async getPolicy(mail, zjId = '', dirPath = '') {
        const { ctx, config } = this
        const { bucket, secret, callbackUrl, host, AccessKey, md5Salt } = config.ossSTS;

        const createTime = new Date().getTime()
        if (!dirPath) {
            dirPath = ctx.helper.deleteSymbol(mail) + '/'
            if (zjId) dirPath = dirPath + zjId + '/'
        }
        // https://help.aliyun.com/document_detail/31988.html#h2-url-2
        const policy = Buffer.from(JSON.stringify({
            // 过期时间 为最大过期时间 9小时
            expiration: new Date(createTime + 32400000).toISOString(), 
            conditions: [
                { bucket },
                // 文件最小 文件最大 2GB = 2147483648b
                ["content-length-range", 0, 2147483648], 
                // 授权目录 防止恶意篡改请求而覆盖文件
                ["starts-with", "$key", dirPath] 
            ]
        })).toString("base64")

        // OSS支持目录删除 故依照mail/object or mail/zjId/object 即可实现删除 
        // 没必要专门入库
        // // 记录这条STS数据
        // let result = await ctx.service.mongo.save('Oss', { zjId, dirPath, createTime, mail })
        // if (!result._id) return {}

        let callbackbody = Buffer.from(JSON.stringify(
            {
                "callbackUrl": callbackUrl,
                //callback返回    完整路径            后缀名                      大小               mail             秘钥
                "callbackBody": "filename=${object}&suffix=${imageInfo.format}&size=${size}" + "&mail=" + mail + '&md5=' + ctx.helper.getMd5(mail + md5Salt),
                "callbackBodyType": "application/x-www-form-urlencoded"
            }
        )).toString("base64");
        const signature = crypto
            .createHmac("sha1", secret)
            .update(policy)
            .digest("base64");

        return {
            AccessKey,
            host,
            policy,
            signature,
            callbackbody,
            startsWith: dirPath,
        };
    }

}

module.exports = OSSService;