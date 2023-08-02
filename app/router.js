'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  app.beforeStart(async () => {
    // 同步数据库
    await app.model.sync();
  });

  const { router, controller, middleware } = app;

  // 身份认证
  const loginVerify = middleware.loginVerify(app.config.jwt.secret);
  router.post('/api/user/login', controller.user.login.login);
  router.post('/api/user/signin', controller.user.login.signIn);
  router.get('/api/user/getUserInfo', loginVerify, controller.user.index.getUserInfo);
  router.post('/api/user/updateUserInfo', loginVerify, controller.user.index.updateUserInfo);
};
