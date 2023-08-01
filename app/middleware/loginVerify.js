module.exports = secret => {
  return async function loginVerify(ctx, next) {
    const token = this.ctx.request.header.authorization;
    if (token !== 'null' && token) {
      try {
        ctx.app.jwt.verify(token, secret);
        await next();
      } catch (error) {
        ctx.status = 200;
        ctx.body = {
          code: 401,
          message: '身份过期',
        };
        return;
      }
    } else {
      ctx.status = 200;
      ctx.body = {
        code: 401,
        message: '未登录',
      };
    }
  };
};
