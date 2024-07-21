"use client"

// src/components/SendTokens.tsx

import React, { useState } from 'react';
import { useWallet } from '@/context/WalletContext'; // Assuming you have a WalletContext set up
import { sendTokens } from '@/utils/sendTokens';

const SendTokens: React.FC = () => {
    const { selectedAccount } = useWallet();
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState<number>(0);
    const [status, setStatus] = useState<string | null>(null);

    const handleSend = async () => {
        if (!selectedAccount) {
            setStatus('Please connect your wallet first.');
            return;
        }

        try {
            setStatus(`Sending ${amount} DOT to ${recipient}...`);
            await sendTokens(selectedAccount, recipient, amount);
            setStatus('Transaction successful!');
        } catch (error) {
            console.error(error);
            setStatus('Transaction failed. Please check the console for details.');
        }
    };

    return (
        <div>
            <h2>Send DOT</h2>
            <input
                type="text"
                placeholder="Recipient Address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
            />
            <button onClick={handleSend}>Send</button>
            {status && <p>{status}</p>}
        </div>
    );
};

export default SendTokens;
