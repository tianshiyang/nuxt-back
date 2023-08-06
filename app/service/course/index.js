const Service = require('egg').Service;
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
}

module.exports = CourseService;
