import Players from "./players";
import Grand from "./grand";
import Bid from "./bid";
import Header from "./header";
import { CannonCoinsProvider } from "./context";
// import WildTimeBid from "@/sections/wild-time/bid";

export default function NewBTC() {
  return (
    <CannonCoinsProvider>
      <div className="bg-black h-screen overflow-hidden bg-[url('/new-btc/bg.gif')] bg-cover bg-center">
        <Header className="h-[202px]" />
        <Grand className="h-[calc(100vh-456px)] mt-[25px]" />
        <Bid className="h-[106px]" />
        <Players className="h-[148px] mt-[-1px]" />
        {/* <WildTimeBid /> */}
      </div>
    </CannonCoinsProvider>
  );
}
