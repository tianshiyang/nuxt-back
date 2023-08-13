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
  router.post('/api/user/updateUserPassword', loginVerify, controller.user.index.updateUserPassword);

  // 课程管理
  router.post('/api/course/createCourse', loginVerify, controller.course.index.createCourse);
  router.get('/api/course/getCourseList', loginVerify, controller.course.index.getCourseList);
  router.get('/api/course/getCourseDetail', loginVerify, controller.course.index.getCourseDetail);
  router.post('/api/course/updateCourse', loginVerify, controller.course.index.updateCourse);
  router.post('/api/course/deleteCourse', loginVerify, controller.course.index.deleteCourse);

  // 购物车
  router.post('/api/order/addCard', loginVerify, controller.order.index.addCard);
  router.get('/api/order/getCarList', loginVerify, controller.order.index.getCarList);
  router.post('/api/order/deleteCarCourse', loginVerify, controller.order.index.deleteCarCourse);
};
