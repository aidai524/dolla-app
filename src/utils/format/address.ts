export const formatAddress = (address: string, length = 4) => {
  return address
    ? `${address.slice(0, length)}...${address.slice(-length)}`
    : "-";
};
