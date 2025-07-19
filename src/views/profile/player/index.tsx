import SwitchPanel from "@/components/switch/switch-panel";
import Statistics from "./statistics";
// import ProfileChart from "./profile-chart";
import History from "./history";
import UserInfo from "./user-info";
import Invite from "./invite";
import { INVATE_ACTIVE } from "@/config";
import Header from "../header";
import Dashboard from "../ components/dashboard/index";
import Tabs from "@/components/tabs";
import { useState } from "react";
import Radio from "@/components/radio";
import PlayerMarkets from "./markets";
import { AnimatePresence } from "framer-motion";
import Records from "./records";

const TabsList = [
  {
    key: "joinedMarket",
    label: "Joined Market"
  },
  {
    key: "records",
    label: "Records"
  },
];

export default function Player() {
  const [tab, setTab] = useState(TabsList[0].key);
  const [joinedMarketFilter, setJoinedMarketFilter] = useState("1");

  return (
    <div className="w-full h-screen overflow-y-auto pb-[30px]">
      <div className="pt-[30px] w-[933px] mx-auto">
        <Header tab="player" />
        <SwitchPanel>
          <Dashboard tab="player" className="mt-[49px]" />
          <div className="flex justify-between items-center gap-[10px] mt-[44px]">
            <Tabs
              currentTab={tab}
              onChangeTab={setTab}
              tabs={TabsList}
              className="!gap-[62px]"
              tabClassName="!text-[18px] !pb-[14px] font-[SpaceGrotesk]"
              cursorClassName="!w-[30px] !bg-[#FFC42F] left-1/2 -translate-x-1/2"
            />
            {
              tab === TabsList[0].key && (
                <div className="flex items-center justify-end gap-[15px]">
                  <Radio
                    checked={joinedMarketFilter === "1"}
                    onChange={setJoinedMarketFilter}
                    name="joinedMarketFilter"
                    value="1"
                  />
                  <Radio
                    checked={joinedMarketFilter === "2"}
                    onChange={setJoinedMarketFilter}
                    name="joinedMarketFilter"
                    value="2"
                  >
                    Live only
                  </Radio>
                </div>
              )
            }
          </div>
          <AnimatePresence>
            {
              tab === TabsList[0].key && (
                <SwitchPanel>
                  <PlayerMarkets />
                </SwitchPanel>
              )
            }
             {
              tab === TabsList[1].key && (
                <SwitchPanel>
                  <Records />
                </SwitchPanel>
              )
            }
          </AnimatePresence>
        </SwitchPanel>
      </div>
    </div>
  );
}
