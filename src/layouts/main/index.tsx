import { Outlet, useLocation, useNavigate } from "react-router-dom";

// import TopWinner from "@/components/top-winner";
import Actions from "./actions";
// import LeftPanel from "./left-panel";
// import Tips from "./tips";
import clsx from "clsx";
// import Leaderboard from "./leaderboard";
import Switch from "@/components/switch";
// import "@/libs/howl";
import { useMemo, useRef } from "react";
import Cashier from "../../components/cashier";
import Footer from "./footer";
import ClaimHints from "@/components/claim-hints";

const Content = () => {
  // const { homeData } = useHome();
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const tab = useMemo(() => {
    if (pathname.includes("/btc")) return "btc";
    if (pathname.includes("/nft")) return "nft";
    return "btc";
  }, [pathname]);
  const claimRef = useRef<any>(null);

  return (
    <div className="h-screen overflow-hidden bg-black flex gap-[16px]">
      {/* <LeftPanel data={homeData} /> */}
      <div className="h-full w-full relative">
        <div
          className={clsx(
            "z-[100] absolute top-0 w-full backdrop-blur-lg bg-black z-10",
            claimRef.current?.show ? "h-[106px]" : "h-[75px]"
          )}
        >
          <div className="flex items-center justify-between px-[20px]">
            {/* <TopWinner className="absolute top-[20px] left-[50%] translate-x-[-50%]" /> */}
            {/* <Tips purchase={homeData?.latest_purchase} /> */}
            <div className="flex items-center gap-[28px]">
              <img
                src="/logo.svg"
                alt="logo"
                className="w-[101px] h-[30px] ml-[10px]"
              />
              <Switch
                tabs={[
                  { label: "Bid BTC", value: "btc" },
                  { label: "Bid NFT", value: "nft" }
                ]}
                onChange={(tab) => {
                  navigate(`/${tab}`);
                }}
                tab={tab}
              />
            </div>
            <Cashier className="absolute top-[20px] left-[50%] translate-x-[-50%]" />
            <Actions />
          </div>
          <ClaimHints ref={claimRef} />
        </div>

        <div
          className={clsx(
            `flex w-full h-full gap-[16px] overflow-y-auto`,
            claimRef.current?.show ? "pt-[109px]" : "pt-[75px]"
          )}
        >
          <div
            className={clsx(
              "grow flex flex-col items-center min-w-[600px] h-full text-white"
            )}
          >
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default function MainLayout() {
  return <Content />;
}
