import clsx from "clsx";
import ProfileButton from "../button";
import LabelValue from "../label-value";

const StatisticsPlayer = (props: any) => {
  const { className } = props;

  return (
    <div className={clsx("w-full mt-[20px] flex items-center justify-between gap-[40px]", className)}>
      <div className="flex items-center">
        <div className="flex flex-col justify-center items-center gap-[15px] p-[20px_32px_33px] bg-[#22201D] border border-[#6A5D3A] rounded-[16px] shrink-0">
          <div className="">Wins</div>
          <div className="font-[DelaGothicOne] text-[36px]">
            0
          </div>
        </div>
        <LabelValue label="#BTC" className="ml-[45px]">
          0
        </LabelValue>
        <ProfileButton
          className="ml-[64px]"
          onClick={() => { }}
        >
          Share
        </ProfileButton>
      </div>
      <div className="w-[1px] h-[70px] shrink-0 bg-[#423930]"></div>
      <div className="flex items-center">
        <LabelValue label="Your Balance" className="whitespace-nowrap">
          $2,000
        </LabelValue>
        <LabelValue label="Played times" className="ml-[62px] whitespace-nowrap">
          523
        </LabelValue>
        <div className="flex items-center justify-end gap-[10px] ml-[70px]">
          <ProfileButton
            className=""
            onClick={() => { }}
          >
            Fund
          </ProfileButton>
          <ProfileButton
            className=""
            type="default"
            onClick={() => { }}
          >
            Withdraw
          </ProfileButton>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPlayer;
