module.exports = secret => {
  return async function loginVerify(ctx, next) {
    const token = ctx.request.header.token;
    if (token !== 'null' && token) {
      try {
        ctx.app.jwt.verify(token, secret);
        await next();
      } catch (error) {
        ctx.status = 401;
        ctx.body = {
          code: 401,
          message: "登录过期",
        };
        return;
      }
    } else {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        message: '未登录',
      };
    }
  };
};
