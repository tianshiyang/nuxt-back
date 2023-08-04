module.exports = app => {
  const { INTEGER, DATE } = app.Sequelize;
  const Orders = app.model.define('orders', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    courseId: { type: INTEGER, allowNull: false },
    userId: { type: INTEGER, allowNull: false },
    status: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });
  return Orders;
};
