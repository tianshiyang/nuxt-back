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
    let userInfo = await ctx.service.user.index.getUserByUsername(username);

    if (!userInfo) {
      this.success({
        data: null,
        isSuccess: false,
        message: "用户不存在",
      });
    } else {
      userInfo = JSON.parse(JSON.stringify(userInfo));
      if (password === userInfo.password) {
        this.success({
          data: {
            ...userInfo,
            token: this.app.jwt.sign(this.app.config.jwt.secret, userInfo),
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
    const userInfo = await ctx.service.user.index.getUserByUsername(username);
    if (userInfo) {
      this.success({
        data: null,
        message: "用户名已存在",
        isSuccess: false,
      });
    } else {
      let newUserInfo = await ctx.service.user.index.userSignIn({ username, password });
      if (newUserInfo) {
        console.log(newUserInfo);
        newUserInfo = JSON.parse(JSON.stringify(newUserInfo));
        this.success({
          data: {
            ...newUserInfo,
            token: this.app.jwt.sign(this.app.config.jwt.secret, userInfo),
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
