import { useEffect, useState } from "react";
import useCoinBase from "@/hooks/use-coinbase";
import FundFromCex from "./fund-from-cex";
import { useAuth } from "@/contexts/auth";
import useBroadcatChannel from "@/hooks/use-broadcat-channel";
import { toast } from "react-toastify";

export default function FundFromCoinbase({ onBack }: { onBack: () => void }) {
    const { address, userInfo } = useAuth();
    const [amount, setAmount] = useState("");
    const [orderId, setOrderId] = useState("");
    const { coinBaseUrl } = useCoinBase({
        address: userInfo?.sol_user || "",
        amount: Number(amount),
        orderId,
    });

    const { sendMessage, successOrderIds, addOrderId } = useBroadcatChannel();

    useEffect(() => {
        if (successOrderIds.length > 0 && orderId && successOrderIds.includes(orderId)) {
            toast.success('Order successful');
            sendMessage(JSON.stringify({
                orderId,
                type: 'on-close-window',
                status: 'success'
            }))
        }
    }, [successOrderIds, orderId]);

    useEffect(() => {
        const orderId = Math.random().toString(36).substring(2, 15);
        setOrderId(orderId);
        addOrderId(orderId);
    }, []);

    return <div>
        <FundFromCex amount={amount} disabled={!amount || Number(amount) < 10 || !coinBaseUrl} setAmount={setAmount} onBack={onBack} onOrderIdCreated={() => {
            if (coinBaseUrl) {
                const windowWidth = 800;
                const windowHeight = 600;
                const left = (screen.width - windowWidth) / 2;
                const top = (screen.height - windowHeight) / 2;
                window.open(coinBaseUrl, '_blank', `width=${windowWidth},height=${windowHeight},left=${left},top=${top}`);
            }
        }} />
    </div>
}