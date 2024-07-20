"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import dynamic from 'next/dynamic';

// @ts-ignore
const web3Accounts = dynamic(() => import('@polkadot/extension-dapp'), { ssr: false });
// @ts-ignore
const web3Enable = dynamic(() => import('@polkadot/extension-dapp'), { ssr: false });

interface WalletContextType {
    selectedAccount: InjectedAccountWithMeta | undefined;
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedAccount, setSelectedAccount] = useState<InjectedAccountWithMeta | undefined>(undefined);

    useEffect(() => {
        const storedAccount = localStorage.getItem('selectedAccount');
        if (storedAccount) {
            setSelectedAccount(JSON.parse(storedAccount));
        }
    }, []);

    useEffect(() => {
        if (selectedAccount) {
            localStorage.setItem('selectedAccount', JSON.stringify(selectedAccount));
        } else {
            localStorage.removeItem('selectedAccount');
        }
    }, [selectedAccount]);

    const connectWallet = async () => {
        const { web3Enable, web3Accounts } = await import("@polkadot/extension-dapp");
        const extensions = await web3Enable("Polki");

        if (!extensions) {
            throw Error("No Extension Found");
        }

        const allAccounts = await web3Accounts();

        console.log(allAccounts);

        if (allAccounts.length > 0) {
            setSelectedAccount(allAccounts[0]);
        }
    };

    const disconnectWallet = () => {
        setSelectedAccount(undefined);
    };

    return (
        <WalletContext.Provider value={{ selectedAccount, connectWallet, disconnectWallet }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error("useWallet must be used within a WalletProvider");
    }
    return context;
};
