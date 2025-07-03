// Use relative path in development to avoid CORS issues
export const HOST_API = import.meta.env.DEV
  ? ""
  : "https://test-api.dolla.market";

export const BETTING_CONTRACT_ADDRESS =
  "0x215b5B46B85F02A04DEd500150A621022C75e90e";

export const PURCHASE_TOKEN = {
  address: "0x26591f0f2bbab1bb3cd457eE1dfd80EAE1474C6c",
  decimals: 18,
  icon: "/currency/usdc.png",
  name: "USDC.e",
  symbol: "USDC.e"
};

export const INVATE_ACTIVE = false;
