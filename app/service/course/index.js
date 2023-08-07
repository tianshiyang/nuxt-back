const sequelize = require('sequelize');
const BaseService = require('../BaseService');
class CourseService extends BaseService {
  async createCourse() {
    let result = null;
    try {
      result = await this.ctx.model.Course.create({ ...this.ctx.request.body, t_price: this.ctx.request.body.tPrice });
      return this.parseSqlResult(result);
    } catch (err) {
      return this.sqlError(err);
    }
  }

  async getCourseList(params) {
    const where = {
      isDelete: {
        [sequelize.Op.eq]: 0,
      },
    };
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
      return this.parseSqlResult({ list, total });
    } catch (err) {
      return this.sqlError(err);
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
      return this.parseSqlResult(result);
    } catch (err) {
      return this.sqlError(err);
    }
  }

  async updateCourse(queryParams) {
    try {
      const result = this.ctx.model.Course.update({ ...queryParams }, {
        where: {
          id: queryParams.courseId,
        },
      });
      return this.parseSqlResult(result);
    } catch (err) {
      return this.sqlError(err);
    }
  }

  async deleteCourse({ courseId }) {
    try {
      const result = this.ctx.model.Course.update({ isDelete: 1 }, {
        where: {
          id: courseId,
        },
      });
      return this.parseSqlResult(result);
    } catch (err) {
      return this.sqlError(err);
    }
  }
}

module.exports = CourseService;
