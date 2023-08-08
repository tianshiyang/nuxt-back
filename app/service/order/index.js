const BaseService = require("../BaseService");

class OrderService extends BaseService {
  // 查询用户的课程列表
  async findUserCourse({ courseId, id }) {
    try {
      const { count: total, rows: list } = await this.ctx.model.Order.findAndCountAll({
        where: {
          courseId,
          userId: id,
        },
      });
      return this.parseSqlResult({
        total,
        list,
      });
    } catch (err) {
      return this.sqlError(err);
    }
  }

  // 加入购物车
  async addCard({ id, courseId }) {
    try {
      const result = await this.ctx.model.Order.create({
        userId: id,
        courseId,
        status: 1, // 在购物车中
      });
      return this.parseSqlResult(result);
    } catch (err) {
      return this.sqlError(err);
    }
  }
}

module.exports = OrderService;
