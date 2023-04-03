"use strict";
const Service = require("egg").Service;

class MongoService extends Service {
  /*
   * 查询一条数据
   *-> Schema
   *-> obj 查询条件
   *=> {...} || null
   */
  findOne(Schema, obj) {
    return this.ctx.model[Schema].findOne(obj);
  }

  /*
   * 插入数据
   *-> Schema
   *-> obj 插入数据
   *=> {...}
   */
  save(Schema, obj) {
    return new this.ctx.model[Schema](obj).save();
  }

  /*
   * 更新一条数据
   *-> Schema
   *-> QueryObj 查询条件
   *-> obj 修改的数据
   *=> {...}
   */
  async updateOne(Schema, QueryObj, obj) {
    let result = await this.ctx.model[Schema].updateOne(QueryObj, obj);
    return result?.nModified === 1 && result.ok === 1 ? true : false;
  }

  /**
   * 分页数据
   * @param {*} Schema 集合名
   * @param {*} pageSize 每页条数
   * @param {*} pageNum 当前页
   * @param {*} obj 查询条件
   * @param {?} sort 排序条件 -1降序 1正序
   * @returns
   */
  async pagination(Schema, pageSize, pageNum, obj, sort) {
    return sort
      ? this.ctx.model[Schema].find(obj)
          .limit(pageSize)
          .skip((pageNum - 1) * pageSize)
          .sort(sort)
      : this.ctx.model[Schema].find(obj)
          .limit(pageSize)
          .skip((pageNum - 1) * pageSize);
  }
}
module.exports = MongoService;
