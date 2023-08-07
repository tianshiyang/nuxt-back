const BaseController = require("../BaseController");

class CourseControll extends BaseController {
  // 创建课程
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

  // 获取课程列表
  async getCourseList() {
    let result = null;
    const { tPrice: t_price,
      isRecommend: is_recommend,
      startTime,
      endTime,
      isColumn: is_column,
      title,
      price,
      pageSize,
      pageNo } = this.ctx.query;
    try {
      result = this.parseQuery(await this.ctx.service.course.index.getCourseList({
        title,
        price,
        t_price,
        is_recommend,
        startTime,
        endTime,
        is_column,
        pageSize,
        pageNo,
      })
      );
    } catch (err) {
      this.success({
        message: err,
        isSuccess: false,
      });
      return;
    }
    this.success({
      data: result,
      isSuccess: true,
    });
  }
}

module.exports = CourseControll;
