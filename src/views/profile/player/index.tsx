import SwitchPanel from "@/components/switch/switch-panel";
import Statistics from "./statistics";
// import ProfileChart from "./profile-chart";
import History from "./history";
import UserInfo from "./user-info";
import Invite from "./invite";
import { INVATE_ACTIVE } from "@/config";
import Header from "../header";

export default function Player() {
  return (
    <div className="pt-[30px] w-[640px] mx-auto pb-[30px]">
      <Header tab="player" />
      <SwitchPanel>
        <div className="flex items-center justify-between pt-[30px]">
          <UserInfo />
          {INVATE_ACTIVE && <Invite />}
        </div>
        <Statistics from="player" />
        {/* <ProfileChart /> */}
        <History />
      </SwitchPanel>
    </div>
  );
}
