import { PrivyProvider } from "@privy-io/react-auth";
import { baseSepolia, berachain } from "viem/chains";
import { USE_OTHER_WALLET } from "@/config";
import {
  GelatoSmartWalletContextProvider,
  privy,
  wagmi
} from "@gelatonetwork/smartwallet-react-sdk";
import { http } from "wagmi";

export default function WalletProvider({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID as string}
      clientId={import.meta.env.VITE_PRIVY_CLIENT_ID as string}
      config={{
        appearance: {
          accentColor: "#FFC42F",
          theme: "#1a1e24",
          showWalletLoginFirst: true,
          logo: "/logo.svg",
          walletChainType: "ethereum-and-solana",
          walletList: ["metamask"]
        },
        loginMethods: USE_OTHER_WALLET ? ["email", "wallet"] : ["email"],
        fundingMethodConfig: {
          moonpay: {
            useSandbox: true
          }
        },
        embeddedWallets: {
          requireUserPasswordOnCreate: false,
          showWalletUIs: true
        },
        defaultChain: berachain,
        supportedChains: [berachain],
        mfa: {
          noPromptOnMfaRequired: false
        },
        solanaClusters: [
          {
            name: import.meta.env.VITE_SOLANA_CLUSTER_NAME,
            rpcUrl: import.meta.env.VITE_SOLANA_RPC_URL
          }
        ]
      }}
    >
      <GelatoSmartWalletContextProvider
        settings={{
          scw: {
            type: "gelato"
          },
          apiKey: import.meta.env.VITE_SPONSOR_API_KEY as string,
          waas: privy(import.meta.env.VITE_PRIVY_APP_ID as string),
          defaultChain: berachain,
          supportedChains: [berachain],
          wagmi: wagmi({
            chains: [berachain],
            transports: {
              [berachain.id]: http()
            }
          })
        }}
      >
        {children}
      </GelatoSmartWalletContextProvider>
    </PrivyProvider>
  );
}
