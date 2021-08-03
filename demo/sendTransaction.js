const Web3 = require("web3");
const { getHttpProvider } = require("../lib/getRemotHttpProvider");
const { saveData } = require("../lib/saveData");
const web3 = new Web3(getHttpProvider("rinkeby"));
const util = require("util");
const testAccount = process.env.TEST_ACCOUNT;
const privateKey = process.env.PRIVATE_KEY;

const log = console.log;
log("sendTransaction start!");

async function main() {
  // {
  //   // infura节点是不支持 eth_sendTransaction 方法的
  //   web3.eth
  //     .sendTransaction({
  //       from: "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe",
  //       to: "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
  //       value: "1000000000000000",
  //     })
  //     .then((r) => log(r));
  // }

  {
    const gasPrice = await web3.eth.getGasPrice();
    const createTx = {
      to: "0x4922a9895bdCA2F66D260B837cf4Bb2959f8F372", // 交易目标地址
      value: "100000000000000000", //
      gasPrice,
      chainId: 4,
      gas: 2000000, // 手续费上限
    };
    const rawTx = await web3.eth.accounts.signTransaction(createTx, privateKey);
    const raw = rawTx.rawTransaction;
    web3.eth
      .sendSignedTransaction(raw)
      .on("receipt", (res) => {
        console.log("操作成功", res);
      })
      .on("error", (err) => {
        console.log("操作异常");
      });
  }
}

main();
