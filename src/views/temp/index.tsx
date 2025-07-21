import React from "react";
import useTransfer from "@/hooks/solana/use-transfer";
import { QUOTE_TOKEN } from "@/config/btc";

const TempPage: React.FC = () => {
  const { onTransfer } = useTransfer({
    token: QUOTE_TOKEN,
    isTicket: true
  });

  return (
    <div className="relative">
      <button
        className="bg-white text-black button"
        onClick={() =>
          onTransfer(1, import.meta.env.VITE_SOLANA_TICKET_ACCOUNT)
        }
      >
        Transfer
      </button>
    </div>
  );
};

export default TempPage;
