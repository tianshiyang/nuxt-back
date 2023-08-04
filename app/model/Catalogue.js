module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Catalogue = app.model.define('catalogues', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: STRING(30), allowNull: false }, // 标题
    source: { type: STRING(200), allowNull: false }, // 资源地址
    courseId: { type: INTEGER, allowNull: false }, // 课程ID
    created_at: DATE,
    updated_at: DATE,
  });
  return Catalogue; // 目录
};
