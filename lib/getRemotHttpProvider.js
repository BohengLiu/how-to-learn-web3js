var Web3 = require("web3");
const projectID = process.env.PROJECT_ID;

const url = `https://mainnet.infura.io/v3/${projectID}`;

const httpProvider = new Web3.providers.HttpProvider(url);

module.exports = {
  httpProvider,
};
