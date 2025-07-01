import { PrivyProvider } from "@privy-io/react-auth";
import { berachain } from "viem/chains";
import { USE_OTHER_WALLET } from "@/config";

export default function WalletProvider({
  children
}: {
  children: React.ReactNode;
}) {
  return (
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
        }
        // solanaClusters: [
        //   {
        //     name: import.meta.env.VITE_SOLANA_CLUSTER_NAME,
        //     rpcUrl: import.meta.env.VITE_SOLANA_RPC_URL
        //   }
        // ]
      }}
    >
      {children}
    </PrivyProvider>
  );
}
