import Switch from "@/components/switch";
import { useNavigate } from "react-router-dom";

export default function Header({ tab }: any) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center gap-[10px]">
      <Switch
        tab={tab}
        tabs={[
          { label: "Player", value: "player" },
          { label: "Seller", value: "seller" }
        ]}
        onChange={(value) => {
          navigate(`/portfolio/${value}`);
        }}
        className="!h-[32px]"
        tabClassName="!px-[8px]"
      />
      <span className="text-white text-[20px] font-bold leading-[100%] uppercase">
        Profile
      </span>
    </div>
  );
}
