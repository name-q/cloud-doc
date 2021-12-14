'use strict';
const Service = require('egg').Service;

class MongoService extends Service {

    /*
     * 查询是否存在
     *-> Schema 
     *-> obj 查询条件
     *=> {...} || null 
    */
    async findOne(Schema, obj) {
        return await this.ctx.model[Schema].findOne(obj)
    }

    /*
     * 插入数据库
     *-> Schema
     *-> obj 插入数据
     *=> {...}
    */
    async save(Schema, obj) {
        return new this.ctx.model[Schema](obj).save()
    }
}
module.exports = MongoService;