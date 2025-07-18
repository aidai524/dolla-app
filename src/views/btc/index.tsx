import { CannonCoinsProvider } from "./context";
// import WildTimeBid from "@/sections/wild-time/bid";
import MoreMarkets from "./components/more-markets";
import Header from "./components/header";
import BidSelection from "./components/bid-selection";
import BidsInfo from "./components/bids-info";
import MarketInfo from "./components/market-info";
import Grand from "./grand";
import LucyDraw from "./components/lucy-draw";

// import WildTimeBid from "@/sections/wild-time/bid";

export default function NewBTC() {
  return (
    <CannonCoinsProvider>
      <div className=""></div>
      <div className="h-screen overflow-hidden bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,0,0,0)_0%,#000_100%),url('/new-btc/bg.gif')] bg-cover bg-center relative">
        <Header className="h-[214px]" />
        {/* 
        <Bid className="h-[106px]" />
        <Players className="h-[148px] mt-[-1px]" />
        <WildTimeBid /> */}
        <Grand className="h-[calc(100vh-464px)] pt-[25px]" />
        <BidSelection />
        {/* <BidsInfo /> */}
        <MarketInfo />
        <MoreMarkets />
        <LucyDraw />
      </div>
    </CannonCoinsProvider>
  );
}
