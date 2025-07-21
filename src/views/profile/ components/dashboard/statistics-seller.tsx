import clsx from "clsx";
import LabelValue from "../label-value";
import ProfileButton from "../button";
import Badge from "../badge";
import { formatNumber } from "@/utils/format/number";
import Big from "big.js";
import { useAuth } from "@/contexts/auth";
import useClaim from "@/hooks/evm/use-claim";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClaimModal from "../claim/modal";

const StatisticsPlayer = (props: any) => {
  const { className } = props;

  const { onQueryUserInfo, userInfo } = useAuth();
  const { claim, claiming } = useClaim(userInfo?.claim_pool, onQueryUserInfo);
  const navigate = useNavigate();

  const [claimModalOpen, setClaimModalOpen] = useState(false);

  const onSellTotalAmount = useMemo(() => {
    if (!userInfo?.on_sell) {
      return 0;
    }
    return userInfo.on_sell.reduce((acc: any, item: any) => acc + item.token_amount, 0);
  }, [userInfo]);

  return (
    <div className={clsx("flex justify-between items-center gap-[40px] pl-[13px] mt-[40px] pb-[16px]", className)}>
      <div className="flex items-center gap-[50px]">
        <LabelValue label="PnL" className="" valueClassName={clsx(Big(userInfo?.seller_profit || 0).lt(0) ? "text-[#FF399F]" : "text-[#57FF70]")}>
          {Big(userInfo?.seller_profit || 0).lt(0) ? "-" : "+"}{formatNumber(Big(userInfo?.seller_profit || 0).abs(), 2, true, { prefix: "$", isShort: Big(userInfo?.seller_profit || 0).abs().gt(100000), isShortUppercase: true })}
        </LabelValue>
        <LabelValue label="Claimable" className="" valueClassName="flex items-center gap-[13px]">
          <div className="">
            {formatNumber(Big(userInfo?.seller_profit || 0).gt(0) ? userInfo?.seller_profit : 0, 2, true, { prefix: "$", isShort: Big(userInfo?.seller_profit || 0).abs().gt(100000), isShortUppercase: true })}
          </div>
          <ProfileButton
            className=""
            // disabled={claiming || Big(userInfo?.seller_profit || 0).lte(0)}
            // loading={claiming}
            onClick={() => {
              setClaimModalOpen(true);
            }}
          >
            Claim
          </ProfileButton>
        </LabelValue>

      </div>
      <div className="flex justify-end items-center gap-[35px]">
        <LabelValue label="Created Market" className="" valueClassName="flex items-center gap-[13px]">
          <div className="">
            {formatNumber(userInfo?.created, 0, true, { isShort: true, isShortUppercase: true })}
          </div>
          <div className="flex items-center gap-[8px] whitespace-nowrap">
            <Badge
              className="h-[24px] !px-[10px] !text-[14px]"
              icon={(<div className="w-[7px] h-[7px] shrink-0 rounded-full bg-[#57FF70]" />)}
            >
              0 Live
            </Badge>
            <Badge
              className="h-[24px] !px-[10px] !text-[14px]"
              icon={(<div className="w-[7px] h-[7px] shrink-0 rounded-full bg-[#FF399F]" />)}
            >
              0 Cancelled
            </Badge>
            <Badge
              className="h-[24px] !px-[10px] !text-[14px]"
              icon={(<div className="w-[7px] h-[7px] shrink-0 rounded-full bg-[#FF9F39]" />)}
            >
              0 Ended
            </Badge>
          </div>
        </LabelValue>
        <LabelValue label="On Sell" className="" valueClassName="flex items-center gap-[13px]">
          <div className="">
            {formatNumber(onSellTotalAmount, 2, true, { isShort: true, isShortUppercase: true })} BTC
          </div>
          <ProfileButton
            onClick={() => {
              navigate(`btc/create`);
            }}
            type="default"
          >
            Create
          </ProfileButton>
        </LabelValue>
      </div>
      <ClaimModal
        open={claimModalOpen}
        onClose={() => {
          setClaimModalOpen(false);
        }}
      />
    </div>
  );
};

export default StatisticsPlayer;
