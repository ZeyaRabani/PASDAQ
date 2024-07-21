"use client"

import React, { Suspense } from 'react'
import { useWallet } from '@/context/WalletContext'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Swap from '@/components/swap/Swap'
import InformationCard from '@/components/InformationCard'

export default function Page() {
    const { selectedAccount } = useWallet();

    return (
        <MaxWidthWrapper className='pt-4'>
            {selectedAccount ? (
                <Suspense fallback={null}>
                    <Swap />
                </Suspense>
            ) : (
                <Suspense fallback={null}>
                    <InformationCard message='Connect your wallet to buy tokens' />
                </Suspense>
            )}
        </MaxWidthWrapper>
    )
}
