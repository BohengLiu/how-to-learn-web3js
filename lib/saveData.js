const fs = require("fs");

function saveData(data, filename) {
  fs.writeFileSync("./data/" + filename, JSON.stringify(data));
}

module.exports = {
  saveData,
};
