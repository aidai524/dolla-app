import clsx from "clsx";
import LabelValue from "../label-value";
import ProfileButton from "../button";
import Badge from "../badge";

const StatisticsPlayer = (props: any) => {
  const { className } = props;

  return (
    <div className={clsx("flex justify-between items-center gap-[40px] pl-[13px] mt-[40px] pb-[16px]", className)}>
      <div className="flex items-center gap-[70px]">
        <LabelValue label="PnL" className="" valueClassName="text-[#57FF70]">
          +$358
        </LabelValue>
        <LabelValue label="Claimable" className="" valueClassName="flex items-center gap-[13px]">
          <div className="">
            $2,235
          </div>
          <ProfileButton
            className=""
            onClick={() => { }}
          >
            Claim
          </ProfileButton>
        </LabelValue>

      </div>
      <div className="flex justify-end items-center gap-[35px]">
        <LabelValue label="Created Market" className="" valueClassName="flex items-center gap-[13px]">
          <div className="">3</div>
          <div className="flex items-center gap-[8px]">
            <Badge
              className="h-[24px] !px-[10px] !text-[14px]"
              icon={(<div className="w-[7px] h-[7px] 1shrink-0 rounded-full bg-[#57FF70]" />)}
            >
              1 Live
            </Badge>
            <Badge
              className="h-[24px] !px-[10px] !text-[14px]"
              icon={(<div className="w-[7px] h-[7px] shrink-0 rounded-full bg-[#FF399F]" />)}
            >
              1 Cancelled
            </Badge>
            <Badge
              className="h-[24px] !px-[10px] !text-[14px]"
              icon={(<div className="w-[7px] h-[7px] shrink-0 rounded-full bg-[#FF9F39]" />)}
            >
              1 Ended
            </Badge>
          </div>
        </LabelValue>
        <LabelValue label="On Sell" className="" valueClassName="flex items-center gap-[13px]">
          <div className="">
            0.1BTC
          </div>
          <ProfileButton
            onClick={() => { }}
            type="default"
          >
            Create
          </ProfileButton>
        </LabelValue>
      </div>
    </div>
  );
};

export default StatisticsPlayer;
