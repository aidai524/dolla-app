// import DailyCase from "@/components/daily-case";
import AvatarAction from "./avatar-action";
// import Menu from "./menu";
import ListPrize from "../list-prize";
import Button from "@/components/button";
import { useAuth } from "@/contexts/auth";

export default function Actions() {
  const { userInfo, login } = useAuth();

  return (
    <div className="flex h-[72px] items-center gap-[10px] shrink-0">
      {/* <DailyCase active /> */}
      <ListPrize />
      {!userInfo ? (
        <Button onClick={login} className="w-[100px] h-[36px]">
          Connect
        </Button>
      ) : (
        <>
          <AvatarAction />
          {/* <Menu
            onClick={() => {
              logout();
            }}
          /> */}
        </>
      )}
    </div>
  );
}
