const BaseController = require('../BaseController');

class userBaseController extends BaseController {
  async getUserInfo() {
    const { username } = this.getUserToken();
    const userInfo = this.parseQuery(await this.ctx.service.user.index.getUserByUsername(username));
    this.success({
      data: userInfo,
      isSuccess: true,
    });
  }
}

module.exports = userBaseController;
