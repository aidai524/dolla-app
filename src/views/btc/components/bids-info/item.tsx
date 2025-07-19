import dayjs from "dayjs";

export default function Item({ data }: any) {
  return (
    <div className="w-[248px] h-[46px] mt-[10px] p-[8px] flex items-center rounded-[23px] border border-[#FFE9B2] bg-white/10 backdrop-blur-[10px] flex items-center justify-center">
      {/* <img
        src="/new-btc/bid-icon.png"
        className="w-[30px] h-[30px] rounded-full border border-[#131417] mr-[8px]"
      /> */}
      <div className="max-w-[90px] text-[14px] font-bold truncate mr-[5px]">
        {data.user}
      </div>
      <div className="text-[14px] font-bold text-[#FFEF43] mr-[5px]">
        bid {data.times}
      </div>
      <div className="text-[14px] font-bold">{dayjs(data.time).fromNow()}</div>
    </div>
  );
}
