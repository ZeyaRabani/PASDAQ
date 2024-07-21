// src/utils/sendTokens.ts

import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3FromSource } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

export const sendTokens = async (
    sender: InjectedAccountWithMeta,
    recipientAddress: string,
    amount: number
) => {
    // Connect to the Polkadot network
    const provider = new WsProvider('wss://westend-rpc.polkadot.io'); // Example for Westend testnet
    const api = await ApiPromise.create({ provider });

    // Get the injector for the sender account
    const { meta: { source } } = sender;
    const injector = await web3FromSource(source);

    // Prepare the transfer transaction
    const transfer = api.tx.balances.transfer(recipientAddress, amount);

    // Send the transaction
    const unsub = await transfer.signAndSend(sender.address, { signer: injector.signer }, (result) => {
        if (result.status.isInBlock) {
            console.log('Transaction included at block hash', result.status.asInBlock.toHex());
            unsub();
        } else if (result.status.isFinalized) {
            console.log('Transaction finalized at block hash', result.status.asFinalized.toHex());
            unsub();
        } else {
            console.log('Transaction status:', result.status.type);
        }
    });
};
