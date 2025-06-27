import Jackpot from "./jackpot";
import TopPlayers from "./top-players";
import Summary from "./summary";
import PlaceBet from "./place-bet";
import Players from "./players";
import TopBg from "./top-bg";
// import Rewards from "./rewards";
// import PrizeModal from "./prize-modal";
import { HomeProvider } from "./context";
import useData from "./hooks/use-data";

const Content = () => {
  const { currentGame } = useData();
  return (
    <div className="relative">
      <TopBg className="absolute top-0 left-0 w-full h-full pointer-events-none z-[30]" />
      {/*     <Rewards /> */}
      {currentGame?.asset && (
        <>
          <Jackpot />
          <TopPlayers />
          <Summary />
          <PlaceBet />
          <Players data={currentGame} />
        </>
      )}
      {/* <PrizeModal /> */}
    </div>
  );
};

export default function Home() {
  return (
    <HomeProvider>
      <Content />
    </HomeProvider>
  );
}
