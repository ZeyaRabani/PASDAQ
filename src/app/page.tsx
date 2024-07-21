"use client"

import React, { useState, useEffect } from 'react'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Spotlight } from '@/components/ui/spotlight'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import Image from 'next/image'

interface Feature {
  logo: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    logo: '📈',
    title: 'Easy Investment',
    description: 'Simplified index fund investing, making it accessible for everyone to diversify in top cryptocurrencies.'
  },
  {
    logo: '🔄',
    title: 'Auto-Rebalancing',
    description: 'Our smart contracts automatically rebalance the index to ensure optimal asset performance.'
  },
  {
    logo: '📊',
    title: 'Real-Time Tracking',
    description: 'Stay updated with real-time data feeds and price tracking through integrated oracles.'
  },
  {
    logo: '🔗',
    title: 'Seamless Integration',
    description: 'Built on Polkadot, Zeya ensures seamless interaction with the Polkadot ecosystem and other parachains.'
  },
  {
    logo: '💼',
    title: 'Diversified Portfolio',
    description: 'Invest in a diversified selection of top-performing Bitcoin DeFi tokens, BRC-20 assets, and Ordinals NFTs.'
  },
  {
    logo: '🔐',
    title: 'Secure Transactions',
    description: 'Robust smart contracts and secure protocols ensure the safety of your investments.'
  },
  {
    logo: '🚀',
    title: 'High Growth Potential',
    description: 'Tap into the high growth potential of the crypto market with our well-curated index funds.'
  },
  {
    logo: '🌐',
    title: 'User-Friendly Interface',
    description: 'An intuitive and easy-to-use interface designed for both novice and experienced investors.'
  }
]

const FeatureCard: React.FC<Feature> = ({ logo, title, description }) => (
  <div className='relative w-64 p-6 my-4 bg-gray-200 shadow-xl rounded-3xl'>
    <div className='absolute flex items-center p-3 rounded-full shadow-xl bg-gradient-to-r from-[#FF8C00] to-[#FF4500] left-4 -top-8'>
      {/* <Image src={`/assets/home/${logo}.svg`} height={50} width={50} quality={100} alt='img' className='p-1' /> */}
      <p className='text-4xl'>{logo}</p>
    </div>
    <div className='mt-8 text-gray-800'>
      <p className='my-2 text-xl font-semibold'>{title}</p>
      <div className='flex space-x-2 font-medium text-basic'>
        <p>{description}</p>
      </div>
    </div>
  </div>
);

export default function Page() {
  const [totalSum, setTotalSum] = useState<number>(0);
  const [totalSum50, setTotalSum50] = useState<number>(0);
  const [totalSum100, setTotalSum100] = useState<number>(0);

  useEffect(() => {
    const fetchCoinMarketCapData = async () => {
      try {
        const response = await fetch('/coinmarketcap');
        const responseData = await response.json();
        // console.log(responseData);

        if (!responseData.data || !Array.isArray(responseData.data)) {
          throw new Error('Data is not an array');
        }

        const prices = responseData.data.reduce((sum: number, coin: any) => sum + (coin.quote.USD.price || 0), 0);
        // console.log(prices);

        setTotalSum(prices / responseData.data.length);
      } catch (error) {
        // console.log(error);
      }
    };

    const fetchCoinMarketCapData50 = async () => {
      try {
        const response = await fetch('/coinmarketcap50');
        const responseData = await response.json();
        // console.log(responseData);

        if (!responseData.data || !Array.isArray(responseData.data)) {
          throw new Error('Data is not an array');
        }

        const prices = responseData.data.reduce((sum: number, coin: any) => sum + (coin.quote.USD.price || 0), 0);
        // console.log(prices);

        setTotalSum50(prices / responseData.data.length);
      } catch (error) {
        // console.log(error);
      }
    };

    const fetchCoinMarketCapData100 = async () => {
      try {
        const response = await fetch('/coinmarketcap100');
        const responseData = await response.json();
        // console.log(responseData);

        if (!responseData.data || !Array.isArray(responseData.data)) {
          throw new Error('Data is not an array');
        }

        const prices = responseData.data.reduce((sum: number, coin: any) => sum + (coin.quote.USD.price || 0), 0);
        // console.log(prices);

        setTotalSum100(prices / responseData.data.length);
      } catch (error) {
        // console.log(error);
      }
    };

    // fetchCoinbaseData();
    fetchCoinMarketCapData();
    fetchCoinMarketCapData50();
    fetchCoinMarketCapData100();
  }, []);

  return (
    <div>
      <div className='md:h-[30rem] w-full flex md:items-center md:justify-center antialiased bg-grid-white/[0.02] relative overflow-hidden'>
        <Spotlight
          className='-top-40 -left-10 md:-left-32 md:-top-20 h-screen'
          fill='white'
        />
        <Spotlight
          className='h-[80vh] w-[50vw] top-10 left-full'
          fill='purple'
        />
        <Spotlight className='left-80 top-28 h-[80vh] w-[50vw]' fill='blue' />
        <div className=' p-4 max-w-7xl  mx-auto relative z-10  w-full pt-8 md:pt-0'>
          <h1 className='text-4xl md:text-6xl font-bold text-center bg-clip-text dark:text-transparent dark:bg-gradient-to-b dark:from-neutral-50 dark:to-neutral-400 bg-opacity-50'>
            PANDAQ <br /> <span className='italic'>Polkadot On-Chain Index Funds</span>
          </h1>
          <p className='mt-4 font-normal text-lg dark:text-neutral-300 max-w-4xl text-center mx-auto'>
            Explore a new era of decentralized finance with PANDAQ. Our platform simplifies investing in crypto index funds, providing easy access to diversified portfolios on the Polkadot network. Track, manage, and grow your assets seamlessly with PANDAQ&apos;s innovative on-chain solutions.
          </p>
          <div className='flex flex-row py-2 items-center justify-center'>
            <Button className='px-10' asChild>
              <Link href='/swap'>
                Launch App
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <MaxWidthWrapper>
        <div className='flex flex-col space-y-4 items-center justify-center overflow-hidden'>
          <h1 className='text-6xl font-semibold'>Price of PANDAQ Index Fund</h1>
          <div className='text-2xl'>
            P10: ${totalSum.toFixed(4)}
          </div>
          <p>P10 Index Fund consists of the top 10 cryptocurrencies.</p>
          <div className='text-2xl'>
            P50: ${totalSum50.toFixed(4)}
          </div>
          <p>P50 Index Fund consists of the top 50 cryptocurrencies.</p>
          <div className='text-2xl'>
            P100: ${totalSum100.toFixed(4)}
          </div>
          <p>P100 Index Fund consists of the top 100 cryptocurrencies.</p>
          {/* <ContainerScroll
            titleComponent={
              <>
                <h1 className='text-4xl font-semibold text-black dark:text-white'>
                  PANDAQ<br />
                  <span className='text-4xl md:text-[6rem] font-bold mt-1 leading-none'>
                    Crypto Index Funds
                  </span>
                </h1>
              </>
            }>
            <Image
              src={`/linear.webp`}
              alt="hero"
              height={720}
              width={1400}
              className="mx-auto rounded-2xl object-cover h-full object-left-top"
              draggable={false}
            />
          </ContainerScroll> */}
        </div>

        <div>
          <div className='my-12 text-center'>
            <h1 className='text-4xl font-bold leading-10 sm:text-5xl sm:leading-none md:text-6xl'>Features</h1>
          </div>

          <div className='flex items-center justify-center pb-8 w-full'>
            <div className='grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}
