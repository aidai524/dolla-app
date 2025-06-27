import Modal from "@/components/modal";
import Switch from "@/components/switch";
import { useState } from "react";
import { motion } from "framer-motion";
import Recharge from "./panels/recharge";
import Withdraw from "./panels/withdraw";
import Records from "./panels/records";
import { PURCHASE_TOKEN } from "@/config";

export default function CashierModal({ open, onClose }: any) {
  const [tab, setTab] = useState("recharge");
  return (
    <Modal open={open} onClose={onClose}>
      <div className="w-[700px] rounded-[6px] bg-[#232932]">
        <div className="h-[46px] bg-[#191E27] rounded-t-[6px] relative">
          <Switch
            tabs={[
              { label: "Recharge", value: "recharge" },
              { label: "Withdraw", value: "withdraw" },
              { label: "Records", value: "records" }
            ]}
            onChange={(value) => {
              setTab(value as string);
            }}
            tab={tab}
            className="bg-transparent h-full w-[400px] px-[20px]"
            type="line"
          />
          <button
            className="absolute right-[10px] top-[10px] button p-[10px]"
            onClick={() => {
              onClose();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="9"
              viewBox="0 0 10 9"
              fill="none"
            >
              <path
                d="M5 3.375L8 0H10L6 4.5L10 9H8L5 5.625L2 9H0L4 4.5L0 0H2L5 3.375Z"
                fill="#5E6B7D"
              />
            </svg>
          </button>
        </div>
        {tab === "recharge" && (
          <PanelWrapper className="px-[14px] pb-[20px]">
            <Recharge token={PURCHASE_TOKEN} />
          </PanelWrapper>
        )}

        {tab === "withdraw" && (
          <PanelWrapper className="px-[14px] pb-[20px]">
            <Withdraw />
          </PanelWrapper>
        )}

        {tab === "records" && (
          <PanelWrapper className="px-[14px]">
            <Records />
          </PanelWrapper>
        )}
      </div>
    </Modal>
  );
}

const PanelWrapper = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
