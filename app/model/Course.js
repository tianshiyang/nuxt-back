module.exports = app => {
  const { STRING, INTEGER, DATE, DECIMAL, TEXT, JSON } = app.Sequelize;
  const Course = app.model.define('course', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: STRING(30), allowNull: false }, // 姓名
    cover: { type: STRING(255), allowNull: false },
    price: { type: DECIMAL, allowNull: false },
    oPrice: { type: DECIMAL, allowNull: false },
    desc: STRING(255),
    detail: TEXT,
    users: JSON,
    orders: JSON,
    created_at: DATE,
    updated_at: DATE,
  });
  return Course;
};
