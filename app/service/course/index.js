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
    let result = null;
    let total = 0;
    const where = {};
    for (const key in params) {
      if (params[key] !== '' && ![ 'pageSize', 'pageNo' ].includes(key)) {
        where[key] = params[key];
      }
    }
    try {
      result = await this.ctx.model.Course.findAll({
        where,
        limit: Number(params.pageSize),
        offset: Number(params.pageSize) * Number(params.pageNo - 1),
      });
      total = await this.ctx.model.Course.findAll({
        attributes: [[ sequelize.fn("count", "*"), "total" ]],
        limit: 1,
      });
      return [ result, total ];

    } catch (e) {
      return e.sqlMessage;
    }
  }
}

module.exports = CourseService;
