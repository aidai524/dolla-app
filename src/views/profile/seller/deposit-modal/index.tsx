import Button from "@/components/button";
import CloseIcon from "@/components/icons/close";
import Modal from "@/components/modal";
import { formatNumber } from "@/utils/format/number";
import Big from "big.js";
import { useMemo } from "react";
import useTokenBalance from "@/hooks/evm/use-token-balance";
import useDeposit from "@/hooks/evm/use-deposit-reward";
import useApprove from "@/hooks/evm/use-approve";
import { BETTING_CONTRACT_ADDRESS } from "@/config";
import { useAuth } from "@/contexts/auth";

export default function DepositModal({
  open,
  onClose,
  order,
  onSuccess
}: {
  open: boolean;
  onClose: () => void;
  order: any;
  onSuccess: () => void;
}) {
  const rewardTokenInfo = useMemo(() => {
    return order?.reward_token_info?.[0] || {};
  }, [order]);
  const { address } = useAuth();
  const { tokenBalance, isLoading } = useTokenBalance(
    order?.reward_token_info?.[0]
  );

  const amount = useMemo(() => {
    return Big(order?.reward_amount || 0)
      .div(10 ** rewardTokenInfo.decimals)
      .toString();
  }, [order, rewardTokenInfo]);
  const { approving, approve, approved, checking } = useApprove({
    token: order?.reward_token_info?.[0],
    amount: amount?.toString(),
    spender: BETTING_CONTRACT_ADDRESS,
    account: address
  });

  const { depositing, onDeposit } = useDeposit(
    order.pool_id,
    () => {
      onSuccess();
    },
    address
  );

  return (
    <>
      <Modal onClose={onClose} open={open}>
        <div className="w-[370px] rounded-[6px] bg-[#232932] p-[20px]">
          <div className="flex justify-between items-center mb-[14px]">
            <div className="text-[18px] font-medium text-white">
              Deposit Market
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
              {rewardTokenInfo.symbol}{" "}
            </span>
          </div>
          <div className="flex items-center text-[14px] mb-[14px] gap-[10px]">
            <span className="text-[#5E6B7D]">Valued</span>
            <div className="grow border-b border-dashed border-[#303742]" />
            <span className="text-white font-medium">
              ${formatNumber(order?.value, 0, true)}{" "}
            </span>
          </div>
          <div className="flex items-center text-[14px] mb-[14px] gap-[10px]">
            <span className="text-[#5E6B7D]">Balance</span>
            <div className="grow border-b border-dashed border-[#303742] min-w-[50px]" />
            <span className="text-white font-medium text-right">
              {formatNumber(tokenBalance, 0, true)} {rewardTokenInfo.symbol}{" "}
            </span>
          </div>
          <div className="flex justify-end">
            <Button
              className="w-[86px] h-[26px] text-[12px]"
              loading={isLoading || approving || checking || depositing}
              onClick={() => {
                if (!approved) {
                  approve();
                  return;
                }
                onDeposit();
              }}
            >
              {!approved ? "Approve" : "Deposit"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
