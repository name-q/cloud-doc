'use strict';

module.exports = app => {
  let { whoami } = app.middleware

  require('./routers/home')(app)

  // 账号相关
  require('./routers/account')(app, whoami)

};
