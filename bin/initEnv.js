const config = require("../config.js");

module.exports = {
  initEnv: () => {
    if (config.PROJECT_ID) {
      process.env.PROJECT_ID = config.PROJECT_ID;
      process.env.PRIVATE_KEY = config.PRIVATE_KEY;
      process.env.TEST_ACCOUNT = config.TEST_ACCOUNT;
    }
  },
};
