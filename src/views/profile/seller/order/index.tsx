import Market from "@/views/btc/components/more-markets/market";
import ButtonWithAuth from "@/components/button/button-with-auth";

export default function Order() {
  return (
    <Market
      data={{}}
      className="w-[311px] h-[200px]"
      footer={
        <div className="border-t border-t-[#2F3843] mt-[24px] flex justify-between items-center text-[12px] h-[46px] px-[12px]">
          <span className="text-[#5E6B7D]">12:50 20 June, 2025</span>
          {/* <ButtonWithAuth
            className="w-[86px] h-[26px] text-[12px] border border-[#2F3843] !bg-[#1A1E24] !text-[#ADBCCF] ml-[6px]"
            isPrimary={false}
          >
            Cancel
          </ButtonWithAuth> */}
          <ButtonWithAuth className="w-[86px] h-[26px] text-[12px] ml-[6px]">
            Claim
          </ButtonWithAuth>
        </div>
      }
    />
  );
}
