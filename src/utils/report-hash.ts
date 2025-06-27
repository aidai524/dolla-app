import axiosInstance from "@/libs/axios";

export default async function reportHash(hash: string, blockNumber: number) {
  await axiosInstance.post("/api/v1/hash", {
    hash,
    block_number: blockNumber
  });
}
