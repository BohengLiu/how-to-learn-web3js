const Web3 = require("web3");
const { httpProvider } = require("../lib/getRemotHttpProvider");
const web3 = new Web3(httpProvider);
const util = require("util");

const promiseGetAccount = util.promisify(web3.eth.getAccounts);
const log = console.log;

const getNodeAccounts = async () => {
  const accounts = await promiseGetAccount();
  console.log("CurrentNodeAccounts:", accounts);
};
// promiseGetAccount().then((accounts) => console.log(accounts));

// web3.eth.getBlockNumber().then(console.log);

// web3.eth
//   .getBalance("0x407d73d8a49eeb85d32cf465507dd71d507100c1")
//   .then(console.log);

async function main() {
  await getNodeAccounts();
  log("web3.givenProvider", web3.givenProvider); // 仅支持浏览器
  // log("web3.currentProvider", web3.currentProvider);
  log("web3.eth.defaultChain", web3.eth.defaultChain);
  log("web3.eth.defaultCommon", web3.eth.defaultCommon);
  // const nodeCoinbase = await web3.eth.getCoinbase();
  // log("web3.eth.getCoinbase", web3.eth.getCoinbase()); // infura节点不支持此功能
}

main();
