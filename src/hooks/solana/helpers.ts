import * as anchor from "@coral-xyz/anchor";
import {
  getAssociatedTokenAddressSync,
  getAccount,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError,
  createAssociatedTokenAccountInstruction,
  TOKEN_PROGRAM_ID,
  createSyncNativeInstruction
} from "@solana/spl-token";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  LAMPORTS_PER_SOL
} from "@solana/web3.js";
import * as sb from "@switchboard-xyz/on-demand";
import * as nacl from "tweetnacl";
import { createHash } from "crypto";
import { Buffer } from "buffer";

export function getState(program: anchor.Program) {
  const [globalBalPda, bump] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("dolla_state")],
    program.programId
  );
  return { pda: globalBalPda, bump: bump };
}

export async function getNextOrderId(
  program: anchor.Program,
  provider: anchor.AnchorProvider,
  statePda: anchor.web3.PublicKey
) {
  const stateExist = await accountExists(statePda, provider.connection);
  let dollaState = null;
  console.log("state exist:" + stateExist);
  if (stateExist) {
    // @ts-ignore
    dollaState = await program.account.dollaState.fetch(statePda);
    return dollaState.nextOrderId;
  }
  return 0;
}

export async function accountExists(
  publicKey: anchor.web3.PublicKey,
  connection: anchor.web3.Connection
) {
  try {
    const accountInfo = await connection.getAccountInfo(publicKey);
    return accountInfo !== null;
  } catch (error) {
    console.error("Error fetching account info:", error);
    return false;
  }
}

export async function getPool(
  program: anchor.Program,
  provider: anchor.AnchorProvider,
  state: any,
  nextId: anchor.BN
) {
  const [pda, bump] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("dolla_pool"),
      state.toBuffer(),
      nextId.toArrayLike(Buffer, "be", 4)
    ],
    program.programId
  );
  console.log(
    "getPool ==== bump:" + bump + ";program.programId:" + program.programId
  );
  // query pool info
  const stateExist = await accountExists(pda, provider.connection);
  let pool = null;
  if (stateExist) {
    // @ts-ignore
    pool = await program.account.poolState.fetch(pda);
    console.log("pool:" + JSON.stringify(pool));
    console.log("pda:" + JSON.stringify(pda));
    console.log("pool init swol:" + pool.poolId);
    console.log("pool init owner:" + pool.owner);
    console.log("pool base_token:" + pool.baseToken);
    console.log("pool quote_token:" + pool.quoteToken);
  }
  return { pda: pda, bump: bump, pool: pool };
}

export async function getAssociatedTokenAddress(
  mint: any,
  owner: any,
  provider: any
) {
  const connection = provider.connection;
  if (!connection) {
    return null;
  }

  const associatedToken = getAssociatedTokenAddressSync(mint, owner);

  let account: any = null;
  let instruction = null;
  try {
    account = await getAccount(connection, associatedToken);
  } catch (error: unknown) {
    if (
      error instanceof TokenAccountNotFoundError ||
      error instanceof TokenInvalidAccountOwnerError
    ) {
      try {
        instruction = createAssociatedTokenAccountInstruction(
          provider.publicKey!,
          associatedToken,
          owner,
          mint
        );
      } catch (e) {
        console.log(e);
      }
    }
  }

  return {
    address: associatedToken,
    instruction: instruction,
    account
  };
}

export function getWrapToSolIx(user: any, wsolAccount: any, amount: anchor.BN) {
  return [
    SystemProgram.transfer({
      fromPubkey: user.publicKey,
      toPubkey: wsolAccount.address,
      lamports: amount
    }),
    createSyncNativeInstruction(wsolAccount.address, TOKEN_PROGRAM_ID)
  ];
}

export async function getBuyState(
  program: anchor.Program,
  provider: anchor.AnchorProvider,
  poolState: anchor.web3.PublicKey,
  user: anchor.web3.PublicKey
) {
  const [pda, bump] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("dolla_buyer_state"), poolState.toBuffer(), user.toBuffer()],
    program.programId
  );
  console.log(
    "getPool ==== bump:" + bump + ";program.programId:" + program.programId
  );
  // query pool info
  const stateExist = await accountExists(pda, provider.connection);
  let buyerState = null;
  console.log("buyerState stateExist:" + stateExist);
  if (stateExist) {
    console.log("before query buyerState");
    // @ts-ignore
    buyerState = await program.account.buyerState.fetch(pda);
    console.log("before after buyerState");
    console.log("pool:" + JSON.stringify(buyerState));
  }
  return { pda: pda, bump: bump, buyerState: buyerState };
}

export async function loadSbProgram(
  provider: anchor.Provider
): Promise<anchor.Program> {
  const sbProgramId = await sb.getProgramId(provider.connection);
  console.log("sbProgramId:" + sbProgramId.toString());
  const sbIdl = await anchor.Program.fetchIdl(sbProgramId, provider);
  // console.log("sbIdl:" + JSON.stringify(sbIdl.types));
  const sbProgram = new anchor.Program(sbIdl, provider);
  return sbProgram;
}

export function getRandomnessAccount(payer: any) {
  const message = "Dolla-V3";
  const messageBytes = Buffer.from(message);
  const signature = nacl.sign.detached(messageBytes, payer.secretKey);
  console.log("signature:", Buffer.from(signature).toString("hex"));
  const seed = createHash("sha256").update(signature).digest().slice(0, 32);
  return Keypair.fromSeed(seed);
}

export async function setupQueue(program: anchor.Program): Promise<PublicKey> {
  const queueAccount = await sb.getDefaultQueue(
    program.provider.connection.rpcEndpoint
  );
  console.log("Queue account", queueAccount.pubkey.toString());
  try {
    await queueAccount.loadData();
  } catch (err) {
    console.error("Queue not found, ensure you are using devnet in your env");
    process.exit(1);
  }
  return queueAccount.pubkey;
}

export async function getBidGasFee(
  program: anchor.Program,
  state: anchor.web3.PublicKey,
  tokenMint: anchor.web3.PublicKey
) {
  // @ts-ignore
  const dollaState = await program.account.dollaState.fetch(state);
  const allGasFee = dollaState.quoteBidGasFees;
  const allQuoteTokens = dollaState.quoteTokens;
  for (let i = 0; i < allQuoteTokens.length; i++) {
    if (tokenMint.toString() == allQuoteTokens[i]) {
      return new anchor.BN(allGasFee[i]);
    }
  }
  return new anchor.BN(0);
}

export async function getSolanaBalance(
  connection: any,
  walletAddress: string
): Promise<number> {
  try {
    const publicKey = new PublicKey(walletAddress);
    const balance = await connection.getBalance(publicKey);
    return balance / LAMPORTS_PER_SOL;
  } catch (error) {
    console.error("Error getting SOL balance:", error);
    return 0;
  }
}

export async function getTokenBalance(
  connection: any,
  walletAddress: string,
  tokenMint: string,
  decimals: number
): Promise<number> {
  try {
    const walletPublicKey = new PublicKey(walletAddress);
    const mintPublicKey = new PublicKey(tokenMint);
    const tokenAccount = getAssociatedTokenAddressSync(
      mintPublicKey,
      walletPublicKey
    );

    const accountInfo = await getAccount(connection, tokenAccount);
    return Number(accountInfo.amount) / Math.pow(10, decimals);
  } catch (error) {
    return 0;
  }
}
