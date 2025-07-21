import { useEffect, useState } from "react";
import FundFromCex from "./fund-from-cex";
import { useAuth } from "@/contexts/auth";
import useBroadcatChannel from "@/hooks/use-broadcat-channel";
import { toast } from "react-toastify";
import useMoonpay from "@/hooks/use-moonpay";

export default function FundFromCoinbase({ onBack }: { onBack: () => void }) {
    const { address, userInfo } = useAuth();
    const [amount, setAmount] = useState("");
    const [orderId, setOrderId] = useState("");
    const { moonpayUrl } = useMoonpay({
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
        <FundFromCex amount={amount} disabled={!amount || Number(amount) < 20 || !moonpayUrl} setAmount={setAmount} onBack={onBack} onOrderIdCreated={() => {
            if (moonpayUrl) {
                window.open(moonpayUrl, '_blank', 'width=800,height=600,left=100,top=100');
            }
        }} />
    </div>
}