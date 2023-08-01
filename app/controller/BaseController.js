const { Controller } = require("egg");

class BaseController extends Controller {
  success({ data, code = 200, isSuccess = true, ...other }) {
    this.ctx.body = {
      code,
      data,
      isSuccess,
      ...other,
    };
  }

  error({ data, code = 500, message = '请求失败' }) {
    this.ctx.body = {
      data,
      code,
      message,
    };
  }

  noAuthority({ data, code = 401, message = "没有权限" }) {
    this.ctx.body = {
      data,
      code,
      message,
    };
  }
}

module.exports = BaseController;
