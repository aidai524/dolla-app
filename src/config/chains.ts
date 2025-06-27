import { Chain } from "viem";
import { berachain } from "viem/chains";

const chains: Record<number, Chain | any> = {
  [berachain.id]: berachain
};

export default chains;
