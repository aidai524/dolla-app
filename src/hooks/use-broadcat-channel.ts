import { useEffect, useRef, useState } from "react";

const orderIds = [];

export default function useBroadcatChannel() {
    const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
    const [successOrderIds, setSuccessOrderIds] = useState<string[]>([]);

    const sendMessage = (message: string) => {
        broadcastChannelRef.current?.postMessage(message);
    }
    const getParams = () => {
        const searchParams = new URLSearchParams(window.location.search);
        const orderId = searchParams.get('orderId');
        const type = searchParams.get('type');
        return { orderId, type };
    }

    useEffect(() => {
        if (broadcastChannelRef.current) {
            return;
        }

        const broadcastChannel = new BroadcastChannel('cex-channel');
        broadcastChannelRef.current = broadcastChannel;
        broadcastChannel.onmessage = (event) => {
            try {
                const { orderId, type, status } = JSON.parse(event.data);
                console.log('sendMessage', orderId, type);
                if (type === 'on-close-window') {
                    const { orderId: orderIdFromParams } = getParams();
                    if (orderIdFromParams === orderId) {
                        window.close();
                    }
                    return
                }

                if (status === 'success') {
                    console.log('sendMessage success', orderId, type);
                    successOrderIds.push(orderId);
                    setSuccessOrderIds([...successOrderIds]);
                }
            } catch (error) {
                console.error('error', error);
            }
        }
    }, []);

    useEffect(() => {
        const { orderId, type } = getParams();

        if (orderId && sendMessage) {
            console.log('sendMessage', orderId, type);
            sendMessage(JSON.stringify({
                orderId,
                type,
                status: 'success'
            }))
        }
    }, []);

    const addOrderId = (orderId: string) => {
        orderIds.push(orderId);
    }

    return {
        sendMessage,
        addOrderId,
        successOrderIds,
    }
}