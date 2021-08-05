const Web3 = require("web3");
const { getHttpProvider } = require("../lib/getRemotHttpProvider");
const web3 = new Web3(getHttpProvider("rinkeby"));
const privateKey = process.env.PRIVATE_KEY;

// 一个最简单的合约的ABI
const storageABI = [
  {
    inputs: [],
    name: "retrieve",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "num",
        type: "uint256",
      },
    ],
    name: "store",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const storageAddress = "0xE0e0DF03e35818d23A6CcA063Ef78B0B41CCAe34";

async function main() {
  const storageContract = new web3.eth.Contract(storageABI, storageAddress, {
    from: "0x336a17EBA18B1C81880829aCA079ecbB78933A66", // default from address
    gasPrice: "20000000000", // default gas price in wei, 20 gwei in this case
  });

  storageContract.defaultChain = "rinkeby";

  {
    // 获取view function的结果
    storageContract.methods
      .retrieve()
      .call({ from: "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe" })
      .then((result) => {
        console.log("result", result);
      });
  }

  {
    // 调用智能合约某个方法
    const rawData = storageContract.methods.store(2345).encodeABI();
    console.log("rawData", rawData);

    const options = {
      to: storageAddress,
      data: rawData,
      gas: 210000,
      gasPrice: 10000000000,
    };

    const rawTx = await web3.eth.accounts.signTransaction(options, privateKey);
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
