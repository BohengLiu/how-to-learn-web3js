const config = require("../config.js");

module.exports = {
  initEnv: () => {
    if (config.PROJECT_ID) {
      process.env.PROJECT_ID = config.PROJECT_ID;
    }
  },
};
