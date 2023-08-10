const moment = require('moment');
module.exports = app => {
  const { INTEGER, DATE } = app.Sequelize;
  const Orders = app.model.define('orders', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    courseId: { type: INTEGER, allowNull: false },
    userId: { type: INTEGER, allowNull: false },
    status: INTEGER,
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
  Orders.associate = function() {
    app.model.Order.belongsTo(app.model.User, { foreignKey: 'userId', targetKey: "id" });
    app.model.Order.belongsTo(app.model.Course, { foreignKey: 'courseId', targetKey: "id" });
  };
  return Orders;
};
