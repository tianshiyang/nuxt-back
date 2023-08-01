const { Controller } = require('egg');

class userBaseController extends Controller {
  async getUserInfo() {
    this.ctx.body = 'hi, egg';
  }
}

module.exports = userBaseController;
