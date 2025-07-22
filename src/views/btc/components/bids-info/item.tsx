import Avatar from "@/components/avatar";
import { formatAddress } from "@/utils/format/address";
import dayjs from "dayjs";

export default function Item({ data }: any) {
  return (
    <div className="w-[248px] h-[46px] mt-[10px] p-[8px] flex items-center rounded-[23px] border border-[#FFE9B2] bg-white/10 backdrop-blur-[10px] flex items-center justify-center">
      <Avatar
        address={data.user}
        email={data.user_email}
        size={30}
        className="border border-[#131417] mr-[8px]"
      />
      <div className="text-[14px] font-bold truncate mr-[5px]">
        {formatAddress(data.user, 3)}
      </div>
      <div className="text-[14px] font-bold text-[#FFEF43] mr-[5px]">
        bid {data.times}
      </div>
      <div className="text-[14px] font-bold">{dayjs(data.time).fromNow()}</div>
    </div>
  );
}
