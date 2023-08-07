const Service = require('egg').Service;
const sequelize = require('sequelize');
class CourseService extends Service {
  async createCourse() {
    let result = null;
    try {
      result = await this.ctx.model.Course.create({ ...this.ctx.request.body, t_price: this.ctx.request.body.tPrice });
    } catch (err) {
      return err.sqlMessage;
    }
    return result;
  }

  async getCourseList(params) {
    const where = {};
    for (const key in params) {
      if (params[key] !== '' && ![ 'pageSize', 'pageNo' ].includes(key)) {
        if (key === "startTime" || key === "endTime") {
          where.createdAt = {
            [sequelize.Op.between]: [ params.startTime, params.endTime ],
          };
          continue;
        }
        where[key] = params[key];
      }
    }
    try {
      const { rows: list, count: total } = await this.ctx.model.Course.findAndCountAll({
        where,
        limit: Number(params.pageSize),
        offset: Number(params.pageSize) * Number(params.pageNo - 1),
      });
      return {
        list, total,
      };

    } catch (e) {
      console.log(e);
      return e.sqlMessage;
    }
  }

  async getCourseDetail({ courseId }) {
    let result = null;
    try {
      result = await this.ctx.model.Course.findOne({
        where: {
          id: courseId,
        },
      });
      return result;
    } catch (err) {
      return err.sqlMessage;
    }
  }
}

module.exports = CourseService;