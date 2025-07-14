export default function Item() {
  return (
    <div className="w-[248px] h-[46px] p-[8px] flex items-center rounded-[23px] border border-[#FFE9B2] bg-white/10 backdrop-blur-[10px] flex items-center justify-center">
      <img
        src="/new-btc/bid-icon.png"
        className="w-[30px] h-[30px] rounded-full border border-[#131417] mr-[10px]"
      />
      <div className="w-max-[92px] text-[14px] font-bold truncate mr-[5px]">
        bulla_win bid
      </div>
      <div className="text-[20px] font-bold text-[#FFEF43] mr-[5px]">20</div>
      <div className="text-[14px] font-bold">1 sec ago</div>
    </div>
  );
}
