import { useSendTransaction, useSolanaWallets } from '@privy-io/react-auth/solana';
import { getAssociatedTokenAddress } from "./helpers";
import useProgram from "./use-program";
import { PublicKey, Transaction } from "@solana/web3.js";
import { createTransferInstruction } from "@solana/spl-token";
import { useState } from "react";
import reportHash from '@/utils/report-hash';

export default function useSplWithdraw({ token, amount, targetAddress }: { token: any, amount: number, targetAddress: string }) {
    const { sendTransaction } = useSendTransaction();
    const [loading, setLoading] = useState(false);
    const { provider } = useProgram();
    const { wallets } = useSolanaWallets();

    const withdraw = async () => {
        const destination = await getAssociatedTokenAddress(new PublicKey(token.address), new PublicKey(targetAddress), provider);
        if (!destination) {
            return;
        }

        const payer = wallets[0];
        const owerPublicKey = new PublicKey(payer.address);
        const source = await getAssociatedTokenAddress(new PublicKey(token.address), owerPublicKey, provider);

        if (!source) {
            return;
        }

        const transaction: Transaction = new Transaction()

        if (destination.instruction) {
            transaction.add(destination.instruction);
        }

        transaction.add(
            createTransferInstruction(
                source.address,
                destination.address,
                owerPublicKey,
                amount * 10 ** token.decimals,
                []
            )
        );

        const latestBlockhash = await provider.connection.getLatestBlockhash();
        transaction.recentBlockhash = latestBlockhash.blockhash;
        transaction.feePayer = owerPublicKey;

        const receipt = await sendTransaction({
            transaction: transaction,
            connection: provider.connection
        });

        reportHash({
            chain: "solana",
            user: payer.address,
            hash: receipt.signature,
            block_number: latestBlockhash.blockhash
        });

        console.log(receipt);

        return receipt;
    }

    return {
        withdraw,
        loading,
    }
}