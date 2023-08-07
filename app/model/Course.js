const moment = require('moment');
module.exports = app => {
  const { STRING, INTEGER, DATE, DECIMAL, TEXT } = app.Sequelize;
  const Course = app.model.define('courses', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: STRING(30), allowNull: false },
    cover: { type: STRING(255), allowNull: false }, // 封面
    price: { type: DECIMAL(5, 2), allowNull: false }, // 现价
    tPrice: { type: DECIMAL(5, 2), allowNull: false }, // 原价
    desc: { type: TEXT, allowNull: false }, // 描述
    detail: { type: TEXT, allowNull: false }, // 详情
    isRecommend: { type: INTEGER, defaultValue: 0 }, // 是否推荐： 0不推荐， 1推荐
    isColumn: { type: INTEGER, defaultValue: 0 }, // 是否专栏： 0不是，1是
    isDelete: { type: INTEGER, defaultValue: 0 }, // 0否 1是
    createdAt: {
      type: DATE,
      get(val) {
        const value = this.getDataValue(val);
        return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : value;
      },
    },
    updatedAt: {
      type: DATE,
      get(val) {
        const value = this.getDataValue(val);
        return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : value;
      },
    },
  });
  return Course;
};
