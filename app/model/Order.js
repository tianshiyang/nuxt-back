const moment = require('moment');
module.exports = app => {
  const { INTEGER, DATE } = app.Sequelize;
  const Orders = app.model.define('orders', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    courseId: { type: INTEGER, allowNull: false },
    userId: { type: INTEGER, allowNull: false },
    status: INTEGER,
    created_at: {
      type: DATE,
      get(val) {
        const value = this.getDataValue(val);
        return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : value;
      },
    },
    updated_at: {
      type: DATE,
      get(val) {
        const value = this.getDataValue(val);
        return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : value;
      },
    },
  });
  return Orders;
};
