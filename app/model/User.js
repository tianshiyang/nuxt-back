module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: STRING(30), allowNull: false }, // 姓名
    password: { type: STRING(30), allowNull: false },
    nickname: { type: STRING(30) }, // 昵称
    avatar: STRING(100), // 头像
    sex: INTEGER(2), // 性别
    role: { type: INTEGER, defaultValue: 1 }, // 1群众，2管理员
    age: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });
  return User;
};
