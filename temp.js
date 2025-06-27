// 导入 Gelato 智能钱包 SDK 和相关依赖
const {
  createGelatoSmartWalletClient,
  sponsored
} = require("@gelatonetwork/smartwallet");
const { kernel } = require("@gelatonetwork/smartwallet/accounts");
const { gelato } = require("@gelatonetwork/smartwallet/accounts");
const { createWalletClient, createPublicClient, http } = require("viem");
const { privateKeyToAccount } = require("viem/accounts");
const { ethers } = require("ethers");

const PRIVATE_KEY = "";
const SPONSOR_API_KEY = "";
const RPC_URL = "https://rpc.berachain.com";
const CONTRACT_ADDRESS = "0x173890b788f156B9e01008E06D666072F64C2f52";
const PURCHASE_TOKEN = "0xFCBD14DC51f0A4d49d5E53C2E0950e0bC26d0Dce";
const REWARD_TOKEN = "0xFCBD14DC51f0A4d49d5E53C2E0950e0bC26d0Dce";

// 定义 Berachain 链配置
const berachain = {
  id: 80094,
  name: "Berachain",
  network: "berachain",
  nativeCurrency: { name: "BERA", symbol: "BERA", decimals: 18 },
  rpcUrls: { default: { http: [RPC_URL] } },
  blockExplorers: {
    default: { name: "BerachainExplorer", url: "https://berascan.com/" }
  }
};

// 主函数：执行 gasless 交易
async function executeGaslessTransaction() {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

  const owner = privateKeyToAccount(`${PRIVATE_KEY}`);

  const publicClient = createPublicClient({
    chain: berachain,
    transport: http(RPC_URL)
  });

  // 设置 kernel 智能账户（使用 EIP-7702，保持 EOA 地址）
  const account = await kernel({
    owner,
    client: publicClient,
    eip7702: true // set to true if you want to use EIP-7702 with ERC-4337
  });

  // 创建 viem wallet client
  const walletClient = createWalletClient({
    account,
    chain: berachain,
    transport: http(RPC_URL)
  });

  // 创建 Gelato 智能钱包客户端，配置 sponsorApiKey
  const smartWalletClient = await createGelatoSmartWalletClient(walletClient, {
    apiKey: SPONSOR_API_KEY,
    wallet: "gelato" // 使用 Gelato 账户
  });

  // 定义 BettingContract ABI（仅包含 createPool）
  const abi = [
    "function createPool(address purchaseToken, address rewardToken, uint256 rewardAmount, uint256[] nftIds, uint256 drawFee, uint256 anchorPrice)"
  ];

  // 初始化 ethers 合约实例
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

  // 生成 createPool 的交易数据
  const { data } = await contract.populateTransaction.createPool(
    PURCHASE_TOKEN, // 购买代币地址
    REWARD_TOKEN, // 奖励代币地址
    1000, // 奖励金额
    [], // NFT ID 数组（空）
    10, // 抽奖费用
    100 // 锚定价格
  );

  // 发送 gasless 交易
  console.log("正在发送 gasless 交易...");
  const results = await smartWalletClient.execute({
    payment: sponsored(SPONSOR_API_KEY), // 使用 1Balance 赞助 gas
    calls: [
      {
        to: CONTRACT_ADDRESS,
        data: data,
        value: "0" // 无需发送原生代币
      }
    ],
    gasLimit: 1000000n //
  });

  console.log("UserOp Hash:", results?.id);

  const txHash = await results?.wait();
  console.log("交易哈希:", txHash);

  return { results, txHash };
}

executeGaslessTransaction()
  .then(({ results, txHash }) => {
    console.log("Gasless 交易测试成功！", { userOpHash: results?.id, txHash });
  })
  .catch((error) => {
    console.error("Gasless 交易测试失败:", error.message);
    process.exit(1);
  });
