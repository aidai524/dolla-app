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
import { createHash } from "crypto";
import { Buffer } from "buffer";
import * as sb from "@switchboard-xyz/on-demand";

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

  // query pool info
  const stateExist = await accountExists(pda, provider.connection);
  let pool = null;
  if (stateExist) {
    // @ts-ignore
    pool = await program.account.poolState.fetch(pda);
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

  // Check if owner is a PDA (off-curve address)
  // For PDAs, we need to allow off-curve addresses
  // We'll use a safer approach by always allowing off-curve addresses
  // since PDAs are commonly used as token account owners in Solana programs
  const isOffCurve = true;

  const associatedToken = getAssociatedTokenAddressSync(
    mint,
    owner,
    isOffCurve // Allow off-curve addresses for PDAs
  );

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
  const sbProgram = new anchor.Program(sbIdl!, provider);
  return sbProgram;
}

export function getRandomnessAccount(payer: any) {
  // In browser environment, we can't access secretKey
  // Use alternative methods to generate deterministic randomness account

  // Method 1: Use public key + timestamp + random salt
  const timestamp = Date.now().toString();
  const randomSalt = Math.random().toString(36).substring(2, 15);
  const message = payer + timestamp + randomSalt;

  // Method 2: Use public key + fixed seed (more deterministic)
  // const message = (payer.address || payer.publicKey?.toString() || "default") + "Dolla-V3";

  const seed = createHash("sha256").update(message).digest().slice(0, 32);
  const keypair = Keypair.fromSeed(seed);

  console.log("Generated randomness account:", keypair.publicKey.toString());
  return keypair;
}

export async function setupQueue(program: anchor.Program): Promise<PublicKey> {
  return new PublicKey("EYiAmGSdsQTuCw413V5BzaruWuCCSDgTPtBGvLkXHbe7");
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

export class BrowserRandomness {
  public program: any;
  public publicKey: PublicKey;

  constructor(program: any, publicKey: PublicKey) {
    this.program = program;
    this.publicKey = publicKey;
  }

  static async create(
    program: any,
    keypair: any,
    queue: PublicKey,
    payer: PublicKey
  ): Promise<[BrowserRandomness, any]> {
    // Browser implementation - return mock instructions
    const createIx = {
      programId: program.programId,
      keys: [],
      data: Buffer.from([])
    };
    const instance = new BrowserRandomness(program, keypair.publicKey);
    return [instance, createIx];
  }

  async commitIx(queue: PublicKey, payer: PublicKey) {
    // Browser implementation - return mock commit instruction
    return {
      programId: this.program.programId,
      keys: [],
      data: Buffer.from([])
    };
  }
}
