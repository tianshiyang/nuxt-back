const BaseController = require("../BaseController");

class CourseControll extends BaseController {
  async createCourse() {
    const rules = {
      title: "string",
      price: "string",
      tPrice: "string",
      desc: "string",
      detail: "string",
    };
    const errors = this.app.validator.validate(rules, this.ctx.request.body);
    if (errors) {
      this.error({
        message: `${errors[0].field}: ${errors[0].message}`,
      });
      return;
    }
    let result = null;
    try {
      result = this.parseQuery(await this.ctx.service.course.index.createCourse());
    } catch (err) {
      this.success({
        isSuccess: false,
        data: err,
      });
    }
    if (result) {
      this.success({
        isSuccess: true,
        data: null,
      });
    } else {
      this.success({
        isSuccess: false,
        message: "创建失败",
      });
    }
  }
}

module.exports = CourseControll;
