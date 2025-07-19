import clsx from "clsx";
import BTCCard from "../../ components/btc-card";

const PlayerMarkets = (props: any) => {
  const { className } = props;

  return (
    <div className={clsx("w-full grid grid-cols-3 gap-x-[15px] gap-y-[20px] mt-[25px]", className)}>
      <BTCCard />
      <BTCCard />
      <BTCCard />
      <BTCCard />
      <BTCCard />
      <BTCCard />
    </div>
  );
};

export default PlayerMarkets;
