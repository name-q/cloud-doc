'use strict';

module.exports = app => {

  require('./routers/home')(app)

  // 账号相关
  require('./routers/account')(app)

};
