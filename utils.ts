import { Connection, Keypair, PublicKey, Signer, TransactionInstruction, TransactionMessage, VersionedTransaction } from "@solana/web3.js";

export function loadWalletKey(keypairFile:string): Keypair {
    const fs = require("fs");
    return Keypair.fromSecretKey(
        new Uint8Array(JSON.parse(fs.readFileSync(keypairFile).toString())),
    );
}

export async function sendVersionedTx(
    connection: Connection,
    instructions: TransactionInstruction[],
    payer: Keypair){
        let latestBlockhash = await connection.getLatestBlockhash()
        const messageLegacy = new TransactionMessage({
            payerKey: payer.publicKey,
            recentBlockhash: latestBlockhash.blockhash,
            instructions,
        }).compileToLegacyMessage();
        const transaction = new VersionedTransaction(messageLegacy)
        const signature = await connection.sendTransaction(transaction);
    }