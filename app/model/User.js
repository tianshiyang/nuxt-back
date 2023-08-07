const moment = require('moment');
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: STRING(30), allowNull: false }, // 姓名
    password: { type: STRING(30), allowNull: false },
    nickname: { type: STRING(30) }, // 昵称
    avatar: STRING(100), // 头像
    sex: INTEGER(2), // 性别
    role: { type: INTEGER, defaultValue: 0 }, // 0群众，1管理员
    age: INTEGER,
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
  return User;
};
