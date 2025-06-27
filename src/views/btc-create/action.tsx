import { useEffect, useState, useMemo } from "react";
import CreateButton from "./create-button";
import Button from "@/components/button";
import useDeposit from "@/hooks/use-deposit-reward";
import useApprove from "@/hooks/use-approve";
import useCreate from "@/hooks/use-create";
import { useAccount } from "wagmi";
import { BETTING_CONTRACT_ADDRESS } from "@/config";

export default function Action({
  amount,
  setPaymentsModalOpen,
  tokenBalance,
  token,
  paymentMethod,
  address,
  anchorPrice,
  loading,
  onSuccess
}: any) {
  const [step, setStep] = useState(0);
  const { address: walletAddress } = useAccount();
  //5,6
  const [poolId, setPoolId] = useState(-1);
  const account = useMemo(
    () => (paymentMethod === 2 ? walletAddress : address),
    [paymentMethod, walletAddress, address]
  );
  const { depositing, onDeposit } = useDeposit(
    poolId,
    () => {
      setStep(0);
      onSuccess();
    },
    account
  );

  const { creating, onCreate } = useCreate({
    token: token,
    amount: token.type === "nft" ? 0 : amount,
    anchorPrice,
    onCreateSuccess: (poolId) => {
      setPoolId(poolId);
      setStep(approved ? 2 : 1);
      if (Number(tokenBalance) < amount) {
        setPaymentsModalOpen(true);
      }
    }
  });

  const { approving, approve, approved, checking } = useApprove({
    token: token,
    amount: amount.toString(),
    spender: BETTING_CONTRACT_ADDRESS,
    account
  });

  useEffect(() => {
    if (poolId === -1) {
      setStep(0);
      return;
    }
    if (approved) {
      setStep(2);
    } else {
      setStep(1);
    }
  }, [approved]);

  if (loading) {
    return <Button loading={loading} className="mt-[20px] w-full h-[40px]" />;
  }
  return step === 0 ? (
    <CreateButton onCreate={onCreate} loading={creating} account={account} />
  ) : step === 1 ? (
    <Button
      className="mt-[20px] w-full h-[40px]"
      onClick={() => {
        approve();
      }}
      loading={approving || checking}
    >
      Approve
    </Button>
  ) : (
    <Button
      className="mt-[20px] w-full h-[40px]"
      onClick={() => {
        onDeposit();
      }}
      loading={depositing}
    >
      Deposit Amount
    </Button>
  );
}
