import { Chain } from "viem";
import { berachain } from "viem/chains";

const chains: Record<number, Chain | any> = {
  [berachain.id]: berachain,
  // Solana (NOT EVM chain)
  // just use the default explorer url
  [-1]: {
    id: -1,
    name: 'Solana',
    nativeCurrency: {
      decimals: 9,
      name: 'SOL',
      symbol: 'SOL',
    },
    contracts: {},
    rpcUrls: {},
    blockExplorers: {
      default: {
        name: 'Solscan',
        url: 'https://solscan.io/',
      },
    },
    ensTlds: [],
    testnet: false,
  },
};

export default chains;
