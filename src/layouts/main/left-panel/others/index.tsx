import LeaderboardIcon from "./leaderboard-icon";
import AffiliatesIcon from "./affiliates-icon";
import ProvablyFairIcon from "./provably-fair-icon";
import NftIcon from "../jackpot/nft-icon";
import NftDisabledIcon from "../jackpot/nft-disable-icon";
import LeaderboardDisabledIcon from "./leaderboard-disable-icon";
import AffiliatesDisabledIcon from "./affiliates-disable-icon";
import ProvablyFairDisabledIcon from "./provably-fair-disable-icon";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

const ITEMS = [
  {
    icon: <NftIcon />,
    disabledIcon: <NftDisabledIcon />,
    title: "1 Dollar Win",
    path: "/"
  },
  {
    icon: <LeaderboardIcon />,
    disabledIcon: <LeaderboardDisabledIcon />,
    title: "Leaderboard",
    path: ""
  },
  {
    icon: <AffiliatesIcon />,
    disabledIcon: <AffiliatesDisabledIcon />,
    title: "Affiliates",
    path: ""
  },
  {
    icon: <ProvablyFairIcon />,
    disabledIcon: <ProvablyFairDisabledIcon />,
    title: "Provably Fair",
    path: ""
  }
];

export default function Others() {
  const navigate = useNavigate();

  const isPathActive = (path: string) => {
    if (!path) return false;
    if (window.location.pathname === path) return true;
    if (window.location.pathname.includes("/detail/") && path === "/")
      return true;
    return false;
  };

  return (
    <div className="rounded-[16px] py-[10px]">
      {ITEMS.map((item) => {
        const isActive = isPathActive(item.path);

        return (
          <div
            key={item.title}
            onClick={() => {
              if (item.path) {
                navigate(item.path);
              }
            }}
            className={clsx(
              "flex items-center gap-[12px] px-[20px] py-[16px] hover:bg-[#191817] duration-300",
              item.path ? "cursor-pointer" : "cursor-not-allowed"
            )}
          >
            {isActive ? item.icon : item.disabledIcon}
            <div
              className={`text-[14px] ${
                isActive ? "text-white" : "text-[#8C8B8B]"
              }`}
            >
              {item.title}
            </div>
          </div>
        );
      })}
    </div>
  );
}
