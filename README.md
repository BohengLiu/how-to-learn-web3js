# 快速掌握web3.js
web3.js是什么？简单来说就是一个和以太坊网络上节点通讯的sdk。所以最快掌控它的方法就是把它提供的api都调一遍。

# Get Start
## 第一步，在infura上申请一个节点接口
首先，我们需要一个可以通讯的以太坊节点。自己跑节点成本太高，最好的办法是申请几个节点接口。infura是区块链Paas服务提供商，提供有免费调用次数的接口。  
1. 进入官网注册： https://infura.io/
2. 在以太坊面板上新建项目：https://infura.io/dashboard/ethereum
3. 进入项目的设置页查看项目的接口。

## 第二步，配置项目参数
在该目录中，参照`config.example.js`的内容创建一个`config.js`的文件，把infura的项目id填入`config.js`中。  


## 第三步，调用demo，体验接口
web3.js的文档： https://web3js.readthedocs.io/en/v1.4.0/
可以使用`yarn demo -p <demo-name>` 或 `npm run demo -p <demo-name>`来启动demo，demo-name就是demo文件夹下的文件名。比如：  
`yarn demo -p helloWorld`

# 在browser环境使用web3

# FAQ
## 不理解api的设计
web3其实混杂了很多功能，根据用途可以划分成： 
1. 通过节点获取区块链上的信息
2. 通过节点在区块链上广播交易
3. 获取连接节点的信息
4. 远程操作节点

## 如何获取代币进行测试？
以太坊存在很多测试网，可以切换到rinkeby网络，通过https://www.rinkeby.io/#faucet 获取代币

## 如何观察链上信息
https://rinkeby.etherscan.io/

## 如何部署智能合约
http://remix.ethereum.org/