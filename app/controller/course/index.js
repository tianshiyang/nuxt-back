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
    const result = await this.ctx.service.course.index.createCourse();
    if (result.error) {
      this.success({
        isSuccess: false,
        message: result.message,
      });
    } else {
      this.success({
        isSuccess: true,
        data: null,
      });
    }
  }

  // 获取课程列表
  async getCourseList() {
    const { tPrice: t_price,
      isRecommend: is_recommend,
      startTime,
      endTime,
      isColumn: is_column,
      title,
      price,
      pageSize,
      pageNo } = this.ctx.query;
    const result = await this.ctx.service.course.index.getCourseList({
      title,
      price,
      t_price,
      is_recommend,
      startTime,
      endTime,
      is_column,
      pageSize,
      pageNo,
    });
    if (result.error) {
      this.success({
        isSuccess: false,
        message: result.message,
      });
    } else {
      this.success({
        data: result.value,
        isSuccess: true,
      });
    }
  }

  // 课程详情
  async getCourseDetail() {
    const rules = {
      courseId: "string",
    };
    const errors = this.app.validator.validate(rules, this.ctx.request.query);
    if (errors) {
      this.error({
        message: `${errors[0].field}: ${errors[0].message}`,
      });
      return;
    }
    const { courseId } = this.ctx.request.query;
    const result = await this.ctx.service.course.index.getCourseDetail({ courseId });
    if (result.error) {
      this.success({
        isSuccess: false,
        message: result.message,
      });
    } else {
      this.success({
        data: {
          detail: result.value,
          isSuccess: true,
        },
      });
    }
  }

  // 更新课程
  async updateCourse() {
    const rules = {
      courseId: "number",
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
    const { courseId, title, price, tPrice, desc, detail, isColumn, isRecommend, cover }
      = this.ctx.request.body;
    const result = this.parseQuery(await this.service.course.index.updateCourse({ courseId, title, price, tPrice, desc, detail, isColumn, isRecommend, cover }));
    if (result.error) {
      this.success({
        isSuccess: false,
        message: result.message,
      });
    } else {
      this.success({
        data: {
          ...result.value,
        },
        isSuccess: true,
      });
    }
  }

  // 删除课程
  async deleteCourse() {
    const rules = {
      courseId: 'number',
    };
    const errors = this.app.validator.validate(rules, this.ctx.request.body);
    if (errors) {
      this.error({
        message: `${errors[0].field}: ${errors[0].message}`,
      });
      return;
    }
    const result = this.parseQuery(await this.ctx.service.course.index.deleteCourse({ courseId: this.ctx.request.body.courseId }));
    if (result.error) {
      this.success({
        message: result.message,
        isSuccess: false,
      });
    } else {
      this.success({
        data: {
          result,
        },
        isSuccess: true,
      });
    }
  }
}

module.exports = CourseControll;
