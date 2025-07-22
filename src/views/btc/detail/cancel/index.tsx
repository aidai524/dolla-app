export default function Cancel() {
  return (
    <div className="w-[403px] h-[224px] rounded-[20px] border border-[#605D55] bg-[rgba(0,0,0,0.5)] backdrop-blur-[25px] flex flex-col items-center justify-center">
      <div className="text-white text-[16px] font-[DelaGothicOne]">
        This market has been cancelled
      </div>
      <div className="text-white text-[16px] mt-[40px]">
        The amount of bid has been refunded
      </div>
    </div>
  );
}
