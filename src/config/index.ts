// Use relative path in development to avoid CORS issues
export const HOST_API = import.meta.env.DEV
  ? ""
  : "https://test-api.dolla.market";

export const BETTING_CONTRACT_ADDRESS =
  "0x173890b788f156B9e01008E06D666072F64C2f52";

export const PURCHASE_TOKEN = {
  address: "0x26591f0f2bbab1bb3cd457eE1dfd80EAE1474C6c",
  decimals: 18,
  icon: "/currency/usdc.png",
  name: "USDC.e",
  symbol: "USDC.e"
};

export const INVATE_ACTIVE = false;

export const USE_OTHER_WALLET = true;
