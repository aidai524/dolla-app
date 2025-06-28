import { createSmartAccountClient } from "permissionless";
import { toSimpleSmartAccount } from "permissionless/accounts";
import { createPublicClient, http } from "viem";
import { berachain } from "viem/chains";
import { createPimlicoClient } from "permissionless/clients/pimlico";
import { entryPoint07Address } from "viem/account-abstraction";

const publicClient = createPublicClient({
  chain: berachain, // or whatever chain you are using
  transport: http()
});

const pimlicoUrl = `https://api.pimlico.io/v2/80094/rpc?apikey=pim_dZVC5k9YV5HtEhYXR3iaAf`;

const pimlicoClient = createPimlicoClient({
  transport: http(pimlicoUrl),
  entryPoint: {
    address: entryPoint07Address,
    version: "0.7"
  }
});

export default async function getPimlicoClientByOwner(owner: any) {
  if (!owner) {
    throw new Error("No owner found");
  }

  const simpleSmartAccount = await toSimpleSmartAccount({
    owner: owner,
    client: publicClient,
    entryPoint: {
      address: entryPoint07Address,
      version: "0.7"
    }
  });

  return createSmartAccountClient({
    account: simpleSmartAccount,
    chain: berachain,
    bundlerTransport: http(pimlicoUrl),
    paymaster: pimlicoClient,
    userOperation: {
      estimateFeesPerGas: async () => {
        return (await pimlicoClient.getUserOperationGasPrice()).fast;
      }
    }
  });
}
