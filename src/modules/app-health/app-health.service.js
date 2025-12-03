const { sequelize } = require('../../db/models');
const constants = require('../../constants');

const AppHealthService = {
  /**
   *
   */
  doGetAppHealth: async () => {
    const appHealthStatus = {
      database: { status: constants.STATUS.DOWN },
      app: { status: constants.STATUS.DOWN },
    };

    try {
      await sequelize.authenticate();
      appHealthStatus.database.status = constants.STATUS.UP;
    } catch (error) {
      // Database connection error
      appHealthStatus.database.status = constants.STATUS.DOWN;
    }

    appHealthStatus.app.status = constants.STATUS.UP;

    return appHealthStatus;
  },
};

module.exports = AppHealthService;
