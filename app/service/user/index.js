const BaseService = require('../BaseService');

class UserService extends BaseService {
  // 通过名称获取当前用户信息
  async getUserByUsername(username) {
    const { ctx } = this;
    try {
      const result = await ctx.model.User.findOne({
        where: {
          username,
        },
      });
      return this.parseSqlResult(result);
    } catch (err) {
      return this.sqlError(err);
    }
  }

  // 注册当前用户
  async userSignIn({ username, password }) {
    try {
      const result = await this.ctx.model.User.create({
        username,
        password,
      });
      return this.parseSqlResult(result);
    } catch (err) {
      return this.sqlError(err);
    }
  }

  // 更新用户信息
  async updateUserInfo({ id, sex, nickname }) {
    try {
      const result = await this.ctx.model.User.update({
        id,
        sex,
        nickname,
      }, {
        where: {
          id,
        },
      });
      return this.parseSqlResult(result);
    } catch (err) {
      return this.sqlError(err);
    }
  }

  // 更新用户密码
  async updateUserPassword({ id, newPassword }) {
    try {
      const result = await this.ctx.model.User.update({
        password: newPassword,
      }, {
        where: {
          id,
        },
      });
      return this.parseSqlResult(result);
    } catch (err) {
      return this.sqlError(err);
    }
  }
}

module.exports = UserService;
