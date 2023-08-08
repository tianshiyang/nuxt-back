const BaseController = require("../BaseController");

class OrderController extends BaseController {
  async addCard() {
    const rules = {
      courseId: "number",
    };
    const errors = this.app.validator.validate(rules, this.ctx.request.body);
    if (errors) {
      this.error({
        message: `${errors[0].field}: ${errors[0].message}`,
      });
      return;
    }
    const { courseId } = this.ctx.request.body;
    const { id } = this.getUserToken();
    // 判断是否存在此课程 -> 每个课程只允许添加或购买一次
    const userCourse = await this.ctx.service.order.index.findUserCourse({ courseId, id });
    if (userCourse.error) {
      this.success({
        isSuccess: false,
        message: userCourse.message,
      });
    } else {
      if (userCourse.value.total > 0) {
        this.success({
          isSuccess: false,
          message: "该课程以加入购物车，请勿重新加入",
        });
        return;
      }
    }
    const result = await this.ctx.service.order.index.addCard({ courseId, id });
    if (result.error) {
      this.success({
        isSuccess: false,
        message: result.message,
      });
    } else {
      this.success({
        isSuccess: true,
        data: {
          ...result.value,
        },
      });
    }
  }

  async getCarList() {
    const rules = {
      pageNo: 'string',
      pageSize: "string",
    };
    const errors = this.app.validator.validate(rules, this.ctx.request.query);
    if (errors) {
      this.error({
        message: `${errors[0].field}: ${errors[0].message}`,
      });
      return;
    }
    const { id } = this.getUserToken();
    const { pageNo, pageSize } = this.ctx.request.query;
    const result = await this.ctx.service.order.index.getCarList({
      userId: id,
      pageNo: Number(pageNo),
      pageSize: Number(pageSize),
    });
    if (result.error) {
      this.success({
        isSuccess: false,
        message: result.message,
      });
    } else {
      this.success({
        isSuccess: true,
        data: {
          ...result.value,
        },
      });
    }
  }
}

module.exports = OrderController;
