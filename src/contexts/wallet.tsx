import { PrivyProvider } from "@privy-io/react-auth";
import { berachain } from "viem/chains";
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { USE_OTHER_WALLET } from "@/config";

const config = getDefaultConfig({
  appName: "Dolla",
  projectId: import.meta.env.VITE_PROJECT_ID,
  chains: [berachain],
  ssr: false
});

const queryClient = new QueryClient();

export default function WalletProvider({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
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
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
