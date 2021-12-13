'use strict';
const Service = require('egg').Service;

class FindService extends Service {

    /*
     * 查询是否存在
     *-> DB 数据库中的集合注册名
     *-> obj 查询条件
     *=> findOne 
    */
    async being(DB, obj) {
        let result = await this.ctx.model[DB].findOne(obj)
        return result
    }
}
module.exports = FindService;