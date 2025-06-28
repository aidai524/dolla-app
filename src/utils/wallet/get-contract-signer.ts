import { ethers } from "ethers";
import getPimlicoClientByOwner from "./pimlico-client";

export default async function getContractSigner(
  wallet: any,
  ethereumProvider: any
): Promise<any> {
  if (wallet?.walletClientType === "privy") {
    const pimlicoClient = await getPimlicoClientByOwner(ethereumProvider);
    console.log("pimlicoClient", pimlicoClient);
    return pimlicoClient;
  } else {
    const provider = new ethers.providers.Web3Provider(ethereumProvider);
    return provider.getSigner();
  }
}
