'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  app.beforeStart(async () => {
    // 同步数据库
    await app.model.sync();
  });

  const { router, controller } = app;
  router.get('/', controller.home.index);
};
