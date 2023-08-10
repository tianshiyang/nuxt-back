const sequelize = require("sequelize");
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

  // 获取购物车列表
  async getCarList({ pageNo, pageSize, userId }) {
    try {
      const { count: total, rows: list } = await this.ctx.model.Order.findAndCountAll({
        attributes: {
          include: [[ sequelize.col('course.title'), 'title' ]],
        },
        where: {
          userId,
          status: 1,
        },
        limit: pageSize,
        offset: (pageNo - 1) * pageSize,
        include: [
          {
            model: this.ctx.model.Course,
            as: 'course',
            attributes: [],
          },
        ],
      });
      return this.parseSqlResult({
        list,
        total,
      });
    } catch (e) {
      console.log(e);
      return this.sqlError(e);
    }
  }
}

module.exports = OrderService;
