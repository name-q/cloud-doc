'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {

  require('./routers/home')(app)

};
