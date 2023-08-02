const BaseController = require('../BaseController');

class userBaseController extends BaseController {
  // 获取用户信息
  async getUserInfo() {
    const { username } = this.getUserToken();
    const userInfo = this.parseQuery(await this.ctx.service.user.index.getUserByUsername(username));
    this.success({
      data: userInfo,
      isSuccess: true,
    });
  }

  // 更新用户信息
  async updateUserInfo() {
    const result = this.parseQuery(await this.ctx.service.user.index.updateUserInfo({ ...this.ctx.request.body }));
    this.success({
      data: result,
      isSuccess: true,
    });
  }
}

module.exports = userBaseController;
