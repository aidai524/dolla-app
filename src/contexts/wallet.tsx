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
          logo: "/logo.png",
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
        supportedChains: [
          berachain
          // {
          //   id: 1399811149,
          //   name: "Solana",
          //   rpcUrls: {
          //     default: {
          //       http: ["https://api.mainnet-beta.solana.com"]
          //     },
          //     public: {
          //       http: ["https://api.mainnet-beta.solana.com"]
          //     }
          //   },
          //   blockExplorers: {
          //     default: {
          //       name: "Solana Explorer",
          //       url: "https://explorer.solana.com"
          //     }
          //   },
          //   nativeCurrency: {
          //     name: "SOL",
          //     symbol: "SOL",
          //     decimals: 9
          //   }
          // }
        ],
        mfa: {
          noPromptOnMfaRequired: false
        }
      }}
    >
      {children}
    </PrivyProvider>
  );
}
