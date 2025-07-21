import clsx from "clsx";
import { useMemo, useState } from "react";
import { CopyBtn, ExitBtn, AddBtn } from "./action-btns";
import Modal from "@/components/modal";
import Recharge from "@/sections/cashier/panels/recharge";
import PriceChart from "../nft-create/price-chart";
import { useAuth } from "@/contexts/auth";
import useCopy from "@/hooks/use-copy";
import { BASE_TOKEN } from "@/config/btc";
import useTokenBalance from "@/hooks/solana/use-token-balance";
import { formatNumber } from "@/utils/format/number";
import useTokenPrice from "@/hooks/use-token-price";
import Loading from "@/components/icons/loading";
import Button from "@/components/button";
import useCreate from "@/hooks/solana/use-create";
import { motion } from "framer-motion";
import ButtonV2 from "@/components/button/v2";
import DoughnutChart from "./doughnut-chart";

export default function BTCCreate() {
  const [amount, setAmount] = useState(1);
  const [chargeModalOpen, setChargeModalOpen] = useState(false);
  const { address, logout } = useAuth();
  const { onCopy } = useCopy();
  const { tokenBalance, isLoading, update } = useTokenBalance(BASE_TOKEN);

  const { prices } = useTokenPrice(BASE_TOKEN);

  const pricePerBTC = useMemo(() => {
    if (!prices || prices?.length === 0) return 0;
    const _p = prices[0].last_price;
    return _p;
  }, [prices]);

  const { onCreate, creating } = useCreate({
    amount,
    anchorPrice: amount * pricePerBTC,
    onCreateSuccess: () => {
      update();
    }
  });

  const errorTips = useMemo(() => {
    if (Number(tokenBalance) < amount) {
      return "Insufficient balance";
    }
    if (pricePerBTC === 0) {
      return "Anchor price not found";
    }
    return "";
  }, [amount, tokenBalance, pricePerBTC]);

  return (
    <div className="w-full h-screen overflow-y-auto font-[SpaceGrotesk] text-[14px] font-[400] leading-[100%] text-white">
      <div className="w-[894px] mx-auto pt-[60px]">
        <div className="text-[20px] font-[DelaGothicOne] text-center">
          Create BTC Market
        </div>
        <div className="mt-[42px] w-full">
          <div className="text-[#BBACA6]">Amount</div>
          <div className="mt-[13px] flex items-center gap-[10px] h-[97px]">
            {[1, 0.1, 0.01, 0.001].map((item, index) => {
              const isActive = amount === item;
              return (
                <motion.div
                  key={index}
                  className={clsx(
                    "button rounded-[10px] bg-[#2B2C2F] flex flex-col items-center justify-center gap-[9px] border",
                    isActive ? "backdrop-blur-[10px]" : ""
                  )}
                  onClick={() => setAmount(item)}
                  initial={{ width: "25%" }}
                  animate={{
                    width: isActive ? "calc(25% + 34px)" : "calc(25% - 11.33px)",
                    height: isActive ? 97 : 78,
                    borderColor: isActive ? "#FFE9B2" : "transparent",
                    backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "#2B2C2F",
                  }}
                  style={{
                    fontSize: isActive ? 20 : 16,
                  }}
                >
                  <div className="font-[DelaGothicOne]">
                    {item} BTC
                  </div>
                  <div className="text-[#BBACA6] text-[14px]">
                    ~${formatNumber(item * pricePerBTC, 0, true)}
                  </div>
                </motion.div>
              );
            })}
          </div>
          <ButtonV2
            disabled={!!errorTips}
            className="mt-[20px] w-full h-[40px]"
            loading={creating}
            onClick={() => {
              if (errorTips) return;
              onCreate();
            }}
          >
            {errorTips || "Create Market"}
          </ButtonV2>
        </div>
        <div className="mt-[36px] w-full">
          <div className="text-[#BBACA6]">Reference Data</div>
          <div className="w-full grid grid-cols-3 gap-[10px] mt-[11px]">
            <div className="rounded-[10px] border border-[#2B2C2F] h-[93px] flex flex-col justify-center items-center gap-[10px]">
              <div className="flex justify-center items-center gap-[7px]">
                <div className="font-[DelaGothicOne]">
                  Top Sale
                </div>
                <img src="/profile/icon-share.svg" className="w-[9px] h-[9px] shrink-0 object-center object-contain" />
              </div>
              <div className="font-[DelaGothicOne] text-[20px]">
                {formatNumber(2325, 2, true, { prefix: "$" })}
              </div>
              <div className="text-[#4DD561] text-[12px] mt-[2px]">
                {formatNumber(228, 2, true, { prefix: "+" })}%
              </div>
            </div>
            <div className="rounded-[10px] border border-[#2B2C2F] h-[93px] flex flex-col justify-center items-center gap-[10px]">
              <div className="flex justify-center items-center gap-[7px]">
                <div className="font-[DelaGothicOne]">
                  Avg. Profit
                </div>
              </div>
              <div className="font-[DelaGothicOne] text-[20px]">
                +{formatNumber(102, 2, true, { prefix: "$" })}
              </div>
              <div className="text-[#4DD561] text-[12px] mt-[2px]">
                {formatNumber(8.2, 2, true, { prefix: "+" })}%
              </div>
            </div>
            <div className="rounded-[10px] border border-[#2B2C2F] h-[93px] flex flex-col justify-center items-center gap-[10px]">
              <div className="flex justify-center items-center gap-[7px]">
                <div className="font-[DelaGothicOne]">
                  Live
                </div>
              </div>
              <div className="font-[DelaGothicOne] text-[20px]">
                {formatNumber(23, 0, true)}
              </div>
              <div className="text-[#4DD561] text-[12px] mt-[2px]">
                {formatNumber(2, 0, true, { prefix: "+" })} new
              </div>
            </div>
          </div>
          <div className="w-full mt-[30px] grid grid-cols-2 h-[210px] place-items-center">
            <DoughnutChart
              className="!w-[210px] !h-[210px]"
              data={[
                { value: 48, label: "5" },
                { value: 25, label: "10" },
                { value: 15, label: "15" },
                { value: 12, label: "20" },
              ]}
              formatLabel={(record: any) => {
                return (
                  <div className="flex flex-col items-center justify-center gap-[5px]">
                    <div className="text-[#BBACA6]">
                      Cash out timing
                    </div>
                    <div className="font-[DelaGothicOne] text-[20px]">
                      in {record.label} days
                    </div>
                    <div className="text-[16px] mt-[10px] text-[#BBACA6]">
                      {record.value}%
                    </div>
                  </div>
                );
              }}
            />
            <DoughnutChart
              className="!w-[210px] !h-[210px]"
              data={[
                { value: 49, amount: 1, bids: "520" },
                { value: 21, amount: 0.1, bids: "3562" },
                { value: 17, amount: 0.01, bids: "12345" },
                { value: 13, amount: 0.001, bids: "67894" },
              ]}
              formatLabel={(record: any) => {
                return (
                  <div className="flex flex-col items-center justify-center gap-[5px]">
                    <div className="text-[16px]">
                      {record.amount} BTC
                    </div>
                    <div className="text-[#BBACA6] mt-[4px]">
                      Bids overmarket
                    </div>
                    <div className="font-[DelaGothicOne] text-[20px] mt-[1px]">
                      {formatNumber(record.bids, 2, true, { isShort: true, isShortUppercase: true })} Bids
                    </div>
                    <div className="text-[16px] mt-[6px] text-[#BBACA6]">
                      {record.value}%
                    </div>
                  </div>
                );
              }}
            />
          </div>
          <PriceChart
            anchorPrice={amount * pricePerBTC}
            className="mt-[36px] rounded-[10px] border border-[#2B2C2F] h-[379px]"
          />
        </div>




        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="flex items-center gap-[8px]">
          <span className="shrink-0 text-[14px] text-[#5E6B7D]">Account</span>
          <div className="grow h-[1px] border-b border-[#5E6B7D]/50 border-dashed" />
          <div className="flex items-center gap-[4px]">
            <span className="text-[14px] mr-[6px]">
              {address ? `${address?.slice(0, 4)}...${address?.slice(-4)}` : "-"}
            </span>
            <CopyBtn
              onClick={async () => {
                onCopy(address);
              }}
            />
            <ExitBtn
              onClick={() => {
                logout();
              }}
            />
          </div>
        </div>
        <div className="flex items-center mt-[20px] gap-[8px]">
          <span className="shrink-0 text-[14px] text-[#5E6B7D]">Balance</span>
          <div className="grow h-[1px] border-b border-[#5E6B7D]/50 border-dashed" />
          <div className="flex items-center gap-[4px]">
            <span className="text-[14px] mr-[6px]">
              {isLoading ? (
                <Loading size={12} />
              ) : (
                `${formatNumber(tokenBalance, 2, true)} BTC`
              )}
            </span>
            <AddBtn
              onClick={() => {
                setChargeModalOpen(true);
              }}
            />
          </div>
        </div>
        <div className="text-[14px] text-[#5E6B7D] mt-[20px]">Amount</div>
        <div className="mt-[6px] flex gap-[10px]">
          {[1, 0.1, 0.01, 0.001].map((item) => (
            <div
              className={clsx(
                "button w-[124px] h-[72px] rounded-[6px] bg-[#191E27] flex flex-col border items-center justify-center",
                amount === item ? "border-[#FFC42F]" : "border-transparent"
              )}
              key={item}
              onClick={() => setAmount(item)}
            >
              <span className={clsx("text-[18px] font-bold text-white")}>
                {item} BTC
              </span>
              <span className="text-[12px] text-[#5E6B7D] mt-[6px]">
                ~${formatNumber(item * pricePerBTC, 0, true)}
              </span>
            </div>
          ))}
        </div>

        {/* <Action
        amount={amount}
        token={BASE_TOKEN}
        address={address}
        anchorPrice={amount * pricePerBTC}
        tokenBalance={tokenBalance}
        onSuccess={() => {
          update();
        }}
      /> */}
        <Button
          disabled={!!errorTips}
          className="mt-[20px] w-full h-[40px]"
          loading={creating}
          onClick={() => {
            if (errorTips) return;
            onCreate();
          }}
        >
          {errorTips || "Create Market"}
        </Button>

        <Modal open={chargeModalOpen} onClose={() => setChargeModalOpen(false)}>
          <div className="w-[316px] h-[436px] p-[15px] rounded-[6px] bg-[#232932]">
            <div className="text-center text-white font-bold">Recharge</div>
            <Recharge token={BASE_TOKEN} />
          </div>
        </Modal>
      </div>
    </div>
  );
}
