module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Order = app.model.define('order', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    course: { type: STRING, allowNull: false },
    courseId: { type: INTEGER, allowNull: false },
    user: { type: STRING, allowNull: false },
    userId: { type: INTEGER, allowNull: false },
    status: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });
  return Order;
};
