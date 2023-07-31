module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const UsersOnCourses = app.model.define('usersOnCourses', {
    user: { type: STRING, allowNull: false },
    userId: { type: INTEGER, allowNull: false },
    course: { type: STRING, allowNull: false },
    courseId: { type: INTEGER, allowNull: false },
    created_at: DATE,
    updated_at: DATE,
  });
  return UsersOnCourses;
};
