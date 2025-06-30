import axiosInstance from "@/libs/axios";

export default async function reportHash(args: any) {
  await axiosInstance.post("/api/v1/hash", args);
}
