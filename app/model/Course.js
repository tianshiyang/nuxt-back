module.exports = app => {
  const { STRING, INTEGER, DATE, DECIMAL, TEXT } = app.Sequelize;
  const Course = app.model.define('courses', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: STRING(30), allowNull: false },
    cover: { type: STRING(255), allowNull: false }, // 封面
    price: { type: DECIMAL(5, 2), allowNull: false }, // 现价
    t_price: { type: DECIMAL(5, 2), allowNull: false }, // 原价
    desc: { type: TEXT, allowNull: false }, // 描述
    detail: { type: TEXT, allowNull: false }, // 详情
    isRecommend: { type: INTEGER, default: 0 }, // 是否推荐： 0不推荐， 1推荐
    isColumn: { type: INTEGER, default: 0 }, // 是否专栏： 0不是，1是
    created_at: DATE,
    updated_at: DATE,
  });
  return Course;
};
