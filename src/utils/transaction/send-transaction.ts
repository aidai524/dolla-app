import axiosInstance from "@/libs/axios";

export const sendSolanaTransaction = async (tx: any) => {
  const txBuffer = tx.serialize({ requireAllSignatures: false });
  const transaction = txBuffer.toString("base64");
  const gasPayResult = await axiosInstance.post(`/api/v1/paygas/sol/send`, {
    operator_key: import.meta.env.VITE_SOLANA_OPERATOR,
    action: "createPool",
    tx: transaction
  });

  const response = await axiosInstance.post(`/api/v1/privy/sol/transaction`, {
    transaction: gasPayResult.data.data
  });
  return response.data;
};
