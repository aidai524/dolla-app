import axiosInstance from "@/libs/axios";
import Big from "big.js";
import { ethers } from "ethers";

export const sendEthereumTransaction = async (tx: any, wallet: any) => {
  const ethereumProvider = await wallet?.getEthereumProvider();
  if (!ethereumProvider) {
    return;
  }
  const provider = new ethers.providers.Web3Provider(ethereumProvider);

  const estimateGas = await provider.estimateGas(tx);
  console.log("estimateGas", estimateGas.toString());
  const nonce = await provider.getTransactionCount(wallet?.address);
  const transaction = {
    data: tx.data,
    to: tx.to,
    chain_id: 80094,
    value: "0x0",
    gas_limit:
      "0x" +
      Number(Big(estimateGas.toString()).mul(1.2).toFixed(0)).toString(16),
    nonce: "0x" + nonce.toString(16)
  };
  if (tx.value) transaction.value = tx.value.toHexString();
  const response = await axiosInstance.post(
    `/api/v1/privy/berachain/transaction`,
    {
      transaction: JSON.stringify(transaction)
    }
  );

  const needConfirmTx = await provider.getTransaction(
    response.data.data.data.hash
  );
  const receipt = await needConfirmTx.wait();
  return receipt;
};
