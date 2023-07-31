module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Course = app.model.define('catalogue', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: STRING(30), allowNull: false },
    source: { type: STRING(200), allowNull: false },
    course: { type: STRING, allowNull: false },
    courseId: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });
  return Course;
};
