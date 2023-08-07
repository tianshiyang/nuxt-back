const Service = require('egg').Service;
class BaseService extends Service {
  sqlError(err) {
    return {
      error: true,
      message: err.original.sqlMessage,
    };
  }

  parseSqlResult(val) {
    return {
      value: JSON.parse(JSON.stringify(val)),
      error: false,
    };
  }
}
module.exports = BaseService;
