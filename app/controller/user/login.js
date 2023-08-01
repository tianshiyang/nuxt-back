const { Controller } = require('egg');

class loginController extends Controller {
  async login() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
}

module.exports = loginController;
