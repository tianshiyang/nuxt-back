const BaseController = require('../BaseController');

class loginController extends BaseController {
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

    if (!userInfo) {
      this.success({
        data: null,
        isSuccess: false,
        message: "用户不存在",
      });
    }
  }
}

module.exports = loginController;
