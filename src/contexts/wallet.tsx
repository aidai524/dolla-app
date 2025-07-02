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
    // <GelatoSmartWalletContextProvider
    //   settings={{
    //     scw: {
    //       type: "gelato"
    //     },
    //     apiKey: import.meta.env.VITE_SPONSOR_API_KEY as string,
    //     waas: privy(import.meta.env.VITE_PRIVY_APP_ID as string),
    //     wagmi: wagmi({
    //       chains: [berachain],
    //       transports: {
    //         [berachain.id]: http()
    //       }
    //     })
    //   }}
    // >
    <PrivyProvider
      appId="cmbkf9huq00tnl80lnrjj94eg"
      clientId="client-WY6MB5peNJNPpVa4xeGgAsE5vDHiWbbHn4W8W24fahweo"
      config={{
        appearance: {
          accentColor: "#FFC42F",
          theme: "#1a1e24",
          showWalletLoginFirst: true,
          logo: "/logo.svg",
          walletChainType: "ethereum-and-solana",
          walletList: ["metamask"]
        },
        loginMethods: [
          "email",
          USE_OTHER_WALLET && "wallet"

          // "google"
          // "discord",
          // "linkedin",
          // "tiktok",
          // "twitter"
        ],
        fundingMethodConfig: {
          moonpay: {
            useSandbox: true
          }
        },
        embeddedWallets: {
          requireUserPasswordOnCreate: false,
          showWalletUIs: true
        },
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
      {children}
    </PrivyProvider>
    // </GelatoSmartWalletContextProvider>
  );
}
