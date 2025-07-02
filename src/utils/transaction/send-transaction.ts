import axiosInstance from "@/libs/axios";

export const sendSolanaTransaction = async (tx: any) => {
  const txBuffer = tx.serialize({ requireAllSignatures: false });
  const response = await axiosInstance.post(`/api/v1/privy/sol/transaction`, {
    transaction: txBuffer.toString("base64")
  });
  return response.data;
};
