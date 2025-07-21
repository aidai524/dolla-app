import { useCallback, useEffect, useState } from "react";
import { getOnrampBuyUrl } from '@coinbase/onchainkit/fund';

const projectId = 'b88afaf3-113e-4ec4-80d0-0178256acc0a';
export default function useCoinBase({ address, amount, orderId }: { address: string, amount: number, orderId: string }) {
    const [coinBaseUrl, setCoinBaseUrl] = useState<string | null>(null);

    const getCoinBaseUrl = useCallback(() => {
        console.log('getCoinBaseUrl', address, amount, orderId);

        if (!address || amount <= 0 || !orderId) {
            setCoinBaseUrl(null);
            return;
        }

        const onrampBuyUrl = getOnrampBuyUrl({
            projectId,
            addresses: { [address]: ['solana'] },
            assets: ['USDC'],
            presetFiatAmount: amount || 0,
            fiatCurrency: 'USD',
            redirectUrl: `${window.location.origin}/callback?type=coinbase&orderId=${orderId}`,
        });

        console.log('onrampBuyUrl', onrampBuyUrl);

        setCoinBaseUrl('http://localhost:5173/callback?type=coinbase&orderId=' + orderId);
    }, [address, amount, orderId])

    useEffect(() => {
        getCoinBaseUrl();
    }, [address, amount]);

    return {
        getCoinBaseUrl,
        coinBaseUrl,
    }

}