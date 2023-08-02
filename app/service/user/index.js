const Service = require('egg').Service;

class UserService extends Service {
  // 判断当前用户是否存在
  async getUserByUsername(username) {
    const { ctx } = this;
    try {
      const result = await ctx.model.User.findOne({
        where: {
          username,
        },
      });
      return result;
    } catch (e) {
      return e.sqlMessage;
    }
  }

  // 注册当前用户
  async userSignIn({ username, password }) {
    try {
      const result = await this.ctx.model.User.create({
        username,
        password,
      });
      return result;
    } catch (e) {
      return e.sqlMessage;
    }
  }
}

module.exports = UserService;
