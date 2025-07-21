import { useCallback, useEffect, useState } from "react";

const apiKey = 'pk_test_123';
export default function useMoonpay({ address, amount, orderId }: { address: string, amount: number, orderId: string }) {
    const [moonpayUrl, setMoonpayUrl] = useState<string | null>(null);

    console.log('address', address);

    const getMoonpayUrl = useCallback(() => {
        if (!address || amount <= 0 || !orderId) {
            setMoonpayUrl(null);
            return;
        }

        // const onrampBuyUrl = getOnrampBuyUrl({
        //     projectId,
        //     addresses: { [address]: ['solana'] },
        //     assets: ['USDC'],
        //     presetFiatAmount: amount || 0,
        //     fiatCurrency: 'USD',
        //     redirectUrl: `${window.location.origin}/callback?type=coinbase&orderId=${orderId}`,
        // });

        // console.log('onrampBuyUrl', onrampBuyUrl);
        const url = `https://buy.moonpay.io/?apiKey=${apiKey}&currencyCode=usdc_sol&walletAddress=${address}&lockAmount=true&quoteCurrencyAmount=${amount}&redirectURL=${window.location.origin}/callback?type=moonpay&orderId=${orderId}`;

        // setCoinBaseUrl(onrampBuyUrl);
        setMoonpayUrl(url);
    }, [address, amount, orderId])

    useEffect(() => {
        getMoonpayUrl();
    }, [address, amount]);

    return {
        getMoonpayUrl,
        moonpayUrl,
    }

}