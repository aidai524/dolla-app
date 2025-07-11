import AvatarAction from "../main/actions/avatar-action";
import { Outlet } from "react-router-dom";
import Button from "@/components/button";
import { useAuth } from "@/contexts/auth";

export default function NewLayout() {
  const { userInfo, login } = useAuth();

  return (
    <div className="h-screen overflow-hidden bg-black relative">
      {/* header */}
      <>
        <img
          src="/logo.svg"
          alt="dolla"
          className="w-[78px] h-[39px] absolute left-[10px] top-[4px] z-[20]"
        />
        <div className="absolute right-[10px] top-[10px] z-[20]">
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
      </>
      <Outlet />
    </div>
  );
}
