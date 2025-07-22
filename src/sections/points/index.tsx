import PointIcon from "@/components/icons/point-icon";
import useUserInfoStore from "@/stores/use-user-info";
import { addThousandSeparator } from "@/utils/format/number";

export default function Points() {
  const { prize } = useUserInfoStore();
  return (
    <div className="flex items-center gap-[8px]">
      <PointIcon />
      <span
        className="text-[#FFEF43] text-[20px] font-bold font-[AlfaSlabOne]"
        style={{
          WebkitTextStrokeWidth: "1px",
          WebkitTextStrokeColor: "#5E3737"
        }}
      >
        x{addThousandSeparator(prize.points.toString())}
      </span>
    </div>
  );
}
