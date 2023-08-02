const BaseController = require('../BaseController');

class loginController extends BaseController {
  // 登录
  async login() {
    const { ctx } = this;
    const rules = {
      username: "string",
      password: "string",
    };

    const errors = this.app.validator.validate(rules, ctx.request.body);
    if (errors) {
      this.error({
        message: `${errors[0].field}: ${errors[0].message}`,
      });
      return;
    }
    const { username, password } = ctx.request.body;
    const userInfo = this.parseQuery(await ctx.service.user.index.getUserByUsername(username));

    if (!userInfo) {
      this.success({
        data: null,
        isSuccess: false,
        message: "用户不存在",
      });
    } else {
      const data = {
        id: userInfo.id,
        username: userInfo.username,
      };
      const token = this.app.jwt.sign(data, this.app.config.jwt.secret);
      if (password === userInfo.password) {
        this.success({
          data: {
            ...userInfo,
            token,
          },
          isSuccess: true,
        });
      } else {
        this.success({
          data: null,
          isSuccess: false,
          message: "用户名或密码错误",
        });
      }
    }
  }

  // 注册
  async signIn() {
    const { ctx } = this;
    const rules = {
      username: "string",
      password: "string",
    };

    const errors = this.app.validator.validate(rules, ctx.request.body);
    if (errors) {
      this.error({
        message: `${errors[0].field}: ${errors[0].message}`,
      });
      return;
    }

    const { username, password } = ctx.request.body;
    const userInfo = this.parseQuery(await ctx.service.user.index.getUserByUsername(username));
    if (userInfo) {
      this.success({
        data: null,
        message: "用户名已存在",
        isSuccess: false,
      });
    } else {
      const newUserInfo = this.parseQuery(await ctx.service.user.index.userSignIn({ username, password }));
      if (newUserInfo) {
        const data = {
          id: newUserInfo.id,
          username: newUserInfo.username,
        };
        const token = this.app.jwt.sign(data, this.app.config.jwt.secret);
        this.success({
          data: {
            ...newUserInfo,
            token,
          },
          isSuccess: true,
        });
      } else {
        this.success({
          data: null,
          isSuccess: false,
          message: "注册失败",
        });
      }
    }
  }
}

module.exports = loginController;
