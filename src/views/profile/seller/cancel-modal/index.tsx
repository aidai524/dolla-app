import Button from "@/components/button";
import CloseIcon from "@/components/icons/close";
import Modal from "@/components/modal";
import { formatNumber } from "@/utils/format/number";
import { useMemo } from "react";
import Big from "big.js";
import useCancelOrder from "@/hooks/use-cancel-order";

export default function CancelModal({
  open,
  onClose,
  onSuccess,
  order
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  order: any;
}) {
  const rewardTokenInfo = useMemo(() => {
    return order?.reward_token_info?.[0] || {};
  }, [order]);
  const {
    cancelling,
    cancelOrder,
    penalty: penaltyStr
  } = useCancelOrder({
    poolId: order.pool_id,
    onSuccess: () => {
      onClose();
      onSuccess();
    }
  });
  const [penalty, finalRefund] = useMemo(() => {
    const _penalty = Big(penaltyStr || 0)
      .div(10 ** order.purchase_token_info.decimals)
      .toString();
    return [_penalty, Big(order?.value).minus(_penalty).toString()];
  }, [penaltyStr, order]);

  return (
    <Modal onClose={onClose} open={open}>
      <div className="w-[370px] h-[414px] rounded-[6px] bg-[#232932] p-[20px]">
        <div className="flex justify-between items-center mb-[14px]">
          <div className="text-[18px] font-medium text-white">
            Cancel Market
          </div>
          <button className="button" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="flex items-center text-[14px] mb-[14px] gap-[10px]">
          <span className="text-[#5E6B7D]">Market Amount</span>
          <div className="grow border-b border-dashed border-[#303742]" />
          <span className="text-white font-medium">
            {formatNumber(
              Big(order?.reward_amount || 0).div(
                10 ** rewardTokenInfo.decimals
              ),
              2,
              true
            )}{" "}
            {rewardTokenInfo.symbol}
          </span>
        </div>
        <div className="flex items-center text-[14px] mb-[14px] gap-[10px]">
          <span className="text-[#5E6B7D]">Valued</span>
          <div className="grow border-b border-dashed border-[#303742]" />
          <span className="text-white font-medium">
            ${formatNumber(order?.value, 0, true)}
          </span>
        </div>
        <div className="flex items-center text-[14px] mb-[14px] gap-[10px]">
          <span className="text-[#5E6B7D]">Bid player</span>
          <div className="grow border-b border-dashed border-[#303742]" />
          <span className="text-white font-medium">
            {formatNumber(order?.accumulative_bids, 0, true)}
          </span>
        </div>
        <div className="flex items-center text-[14px] mb-[14px] gap-[10px]">
          <span className="text-[#5E6B7D]">Total bid value</span>
          <div className="grow border-b border-dashed border-[#303742]" />
          <span className="text-white font-medium">
            ${formatNumber(order?.accumulative_bids, 0, true)}
          </span>
        </div>
        <div className="w-[330px] h-[86px] p-[10px] mb-[16px] mx-auto bg-[#FFC42F1A] rounded-[4px] border border-[#FFC42F]">
          <div className="flex items-center gap-[2px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="11"
              viewBox="0 0 13 11"
              fill="none"
            >
              <path
                d="M5.63398 0.499999C6.01888 -0.166667 6.98113 -0.166667 7.36603 0.5L12.1292 8.75C12.5141 9.41667 12.0329 10.25 11.2631 10.25H1.73686C0.967059 10.25 0.485935 9.41667 0.870835 8.75L5.63398 0.499999Z"
                fill="#FFC42F"
              />
            </svg>
            <span className="text-[#FFC42F] text-[14px] font-medium">
              Be careful!
            </span>
          </div>
          <div className="text-[12px] text-white leading-[14px]">
            If you cancel, platform will refund the bid amount of the player who
            has already participated, and you need to pay 20% in demages.{" "}
          </div>
        </div>
        <div className="flex items-center text-[14px] mb-[14px] gap-[10px]">
          <span className="text-[#5E6B7D]">Demage</span>
          <div className="grow border-b border-dashed border-[#303742]" />
          <span className="text-white font-medium">
            ${formatNumber(penalty, 2, true)}
          </span>
        </div>
        <div className="flex items-center text-[14px] mb-[10px] gap-[10px]">
          <span className="text-[#5E6B7D]">Final refund</span>
          <div className="grow border-b border-dashed border-[#303742]" />
          <span className="text-white font-medium">
            ${formatNumber(finalRefund, 2, true)}
          </span>
        </div>
        <div className="flex justify-end">
          <Button
            className="w-[86px] h-[26px] text-[12px]"
            loading={cancelling}
            onClick={cancelOrder}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
}
