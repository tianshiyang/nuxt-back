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
    const userInfo = await ctx.service.user.index.getUserByUsername(username);

    if (userInfo.error) {
      this.success({
        isSuccess: false,
        message: userInfo.message,
      });
      return;
    }

    if (!userInfo.value) {
      this.success({
        data: null,
        isSuccess: false,
        message: "用户不存在",
      });
    } else {
      const data = {
        id: userInfo.value.id,
        username: userInfo.value.username,
      };
      const token = this.app.jwt.sign(data, this.app.config.jwt.secret);
      if (password === userInfo.value.password) {
        this.success({
          data: {
            ...userInfo.value,
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
    const userInfo = await ctx.service.user.index.getUserByUsername(username);
    if (userInfo.value) {
      this.success({
        data: null,
        message: "用户名已存在",
        isSuccess: false,
      });
    } else {
      const newUserInfo = await ctx.service.user.index.userSignIn({ username, password });
      if (newUserInfo.value) {
        const data = {
          id: newUserInfo.value.id,
          username: newUserInfo.value.username,
        };
        const token = this.app.jwt.sign(data, this.app.config.jwt.secret);
        this.success({
          data: {
            ...newUserInfo.value,
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
