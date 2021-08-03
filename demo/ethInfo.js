const Web3 = require("web3");
const { httpProvider } = require("../lib/getRemotHttpProvider");
const { saveData } = require("../lib/saveData");
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
const getHashrate = async () => {
  const hashRate = await web3.eth.getHashrate();
  log("getHashrate", hashRate);
};

async function main() {
  await getNodeAccounts();
  log("web3.givenProvider", web3.givenProvider); // 仅支持浏览器
  // log("web3.currentProvider", web3.currentProvider);
  log("web3.eth.defaultChain", web3.eth.defaultChain);
  log("web3.eth.defaultCommon", web3.eth.defaultCommon);
  // const nodeCoinbase = await web3.eth.getCoinbase();
  // log("web3.eth.getCoinbase", web3.eth.getCoinbase()); // infura节点不支持此功能

  await getHashrate(); // 节点的hashRate

  {
    const gasPrice = await web3.eth.getGasPrice();
    log("getGasPrice", gasPrice);
  }

  {
    const blockNumber = await web3.eth.getBlockNumber();
    log("getBlockNumber", blockNumber);
  }

  {
    const account = "0xbe0eb53f46cd790cd13851d5eff43d12404d33e8"; // binance 7
    const balance = await web3.eth.getBalance(account);
    log("getBalance", balance);
  }

  // 参考文档：http://cw.hubwiz.com/card/c/ethereum-json-rpc-api/1/3/9/
  // getStorageAt用于获取合约地址在相应位置的状态数据
  {
    const contractAddress = "0x8484ef722627bf18ca5ae6bcf031c23e6e922b30";
    const data = await web3.eth.getStorageAt(contractAddress, 1);
    log("getStorageAt", data);
  }

  // 获取智能合约代码
  {
    const contractAddress = "0x8484ef722627bf18ca5ae6bcf031c23e6e922b30";
    const data = await web3.eth.getCode(contractAddress);
    saveData(
      data,
      "contract_code_0x8484ef722627bf18ca5ae6bcf031c23e6e922b30.json"
    );
  }

  {
    const blockNumber = await web3.eth.getBlockNumber();
    const block = await web3.eth.getBlock(blockNumber);
    saveData(block, "block_" + String(blockNumber) + ".json");
  }

  {
    const blockNumber = await web3.eth.getBlockNumber();
    const txCount = await web3.eth.getBlockTransactionCount(blockNumber);
    log("getBlockTransactionCount", txCount);
  }

  {
    // 叔块
    const blockNumber = await web3.eth.getBlockNumber();
    const blockUncleCount = await web3.eth.getBlockUncleCount(blockNumber);
    log("getBlockUncleCount", blockUncleCount);
  }

  {
    const txHash =
      "0x25ab370a809f35b9474a3db9fb7017597b5414c68a4eca841cdad434a9298bac";
    const tx = await web3.eth.getTransaction(txHash);
    saveData(tx, "transaction_" + txHash + ".json");
  }

  {
    const txHash =
      "0x4da7a24c68c2e5fe58147dabb9ab3c8961d36a06c567dc29114496cfd5b2d03b";
    const tx = await web3.eth.getTransaction(txHash);
    saveData(tx, "transaction_" + txHash + ".json");
  }

  // {
  //   // 不支持普通http连接方式
  //   const pendingTx = await web3.eth.getPendingTransactions();
  //   log("getPendingTransactions", pendingTx);
  // }

  {
    const blockNumber = await web3.eth.getBlockNumber();
    const tx = await web3.eth.getTransactionFromBlock(blockNumber, 0);
    saveData(tx, "transaction_" + tx.hash + ".json");
  }

  {
    const txHash =
      "0x4da7a24c68c2e5fe58147dabb9ab3c8961d36a06c567dc29114496cfd5b2d03b";
    const txReceipt = await web3.eth.getTransactionReceipt(txHash);
    saveData(txReceipt, "receipt_" + txHash + ".json");
  }

  {
    // 一个地址发生了多少笔交易
    const account = "0xbe0eb53f46cd790cd13851d5eff43d12404d33e8"; // binance 7
    const txCount = await web3.eth.getTransactionCount(account);
    log("getTransactionCount", txCount);
  }

  // {
  //   web3.eth.sendTransaction({
  //     from: "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe",
  //     to: "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
  //     value: "1000000000000000",
  //   });
  // }
}

main();
