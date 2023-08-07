const BaseController = require('../BaseController');

class userBaseController extends BaseController {
  // 获取用户信息
  async getUserInfo() {
    const { username } = this.getUserToken();
    const userInfo = await this.ctx.service.user.index.getUserByUsername(username);
    if (userInfo.error) {
      this.success({
        message: userInfo.message,
        isSuccess: false,
      });
      return;
    }
    if (userInfo.value) {
      this.success({
        data: {
          ...userInfo.value,
        },
        isSuccess: true,
      });
    } else {
      this.ctx.response.status = 401;
    }
  }

  // 更新用户信息
  async updateUserInfo() {
    const result = await this.ctx.service.user.index.updateUserInfo({ ...this.ctx.request.body });
    if (result.errors) {
      this.success({
        isSuccess: false,
        message: result.message,
      });
    } else {
      this.success({
        data: result.value,
        isSuccess: true,
      });
    }
  }

  // 更新用户密码
  async updateUserPassword() {
    const rules = {
      oldPassword: "string",
      newPassword: "string",
    };
    const errors = this.app.validator.validate(rules, this.ctx.request.body);
    if (errors) {
      this.success({
        isSuccess: false,
        message: `${errors[0].field}: ${errors[0].message}`,
      });
      return;
    }
    const { oldPassword } = this.ctx.request.body;
    const { id, username } = this.getUserToken();
    const { password } = this.parseQuery(await this.ctx.service.user.index.getUserByUsername(username));
    if (password !== oldPassword) {
      this.success({
        isSuccess: false,
        message: "旧密码错误",
      });
      return;
    }
    await this.ctx.service.user.index.updateUserPassword({ id, ...this.ctx.request.body });
    const data = {
      id,
      username,
    };
    this.success({
      data: {
        token: this.app.jwt.sign(data, this.app.config.jwt.secret),
      },
    });
  }
}

module.exports = userBaseController;
