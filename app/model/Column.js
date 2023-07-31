module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;
  const Column = app.model.define('column', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: STRING(100), allowNull: false },
    cover: { type: STRING(255), allowNull: false },
    desc: { type: STRING(255) },
    content: TEXT,
    created_at: DATE,
    updated_at: DATE,
  });
  return Column;
};
