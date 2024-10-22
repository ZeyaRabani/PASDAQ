import React, { useState, useEffect } from 'react'
import { useWallet } from '@/context/WalletContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import crypto from 'crypto'
// import { newTokenSwap } from '@/actions/dbActions'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RotateCw, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'

interface BTCnSTXPriceResponse {
    data: {
        amount: string;
        base: string;
        currency: string;
    };
}

const bit10Amount = [
    '1',
    '2',
    '3',
    '4',
    '5'
]

const FormSchema = z.object({
    bit10_amount: z.string({
        required_error: 'Please select the number of P10 tokens to receive',
    }),
})

export default function Swap() {
    const [btcAmount, setbtcAmount] = useState<string>('');
    const [coinbaseData, setCoinbaseData] = useState<number[]>([]);
    const [coinMarketCapData, setCoinMarketCapData] = useState<number[]>([]);
    const [totalSum, setTotalSum] = useState<number>(0);
    const [rotate, setRotate] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [swaping, setSwaping] = useState<boolean>(false);

    const { selectedAccount } = useWallet();

    const fetchBTCPrice = async () => {
        try {
            const response = await fetch('https://api.coinbase.com/v2/prices/DOT-USD/buy');
            const data: BTCnSTXPriceResponse = await response.json();
            setbtcAmount(data.data.amount);
        } catch (error) {
            toast.error('Error fetching BTC price. Please try again!');
        }
    };

    useEffect(() => {
        const fetchData = () => {
            fetchBTCPrice();
        }

        fetchData();

        const intervalId = setInterval(fetchData, 30000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        // const fetchCoinbaseData = async () => {
        //     const assets = ['STX', 'MAPO', 'ICP', 'RIF'];
        //     try {
        //         const coinbaseRequests = assets.map(async (asset) => {
        //             const response = await fetch(`https://api.coinbase.com/v2/prices/${asset}-USD/buy`);
        //             const data = await response.json();
        //             return parseFloat(data.data.amount);
        //         });
        //         const result = await Promise.all(coinbaseRequests);
        //         setCoinbaseData(result);
        //     } catch (error) {
        //         toast.error('Error fetching P10price. Please try again!');
        //     }
        // };

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

                setCoinMarketCapData(prices);
                setTotalSum(prices / responseData.data.length);
            } catch (error) {
                // console.log(error);
                toast.error('Error fetching P10price. Please try again!');
            }
        };

        // fetchCoinbaseData();
        fetchCoinMarketCapData();
        setLoading(false);
    }, []);

    // useEffect(() => {
    //     if (coinbaseData.length > 0 && coinMarketCapData.length > 0) {
    //         const sum = coinbaseData.reduce((acc, curr) => acc + curr, 0) + coinMarketCapData.reduce((acc, curr) => acc + curr, 0);
    //         const bit10DeFi = sum / 6;
    //         setTotalSum(bit10DeFi);
    //     } else {
    //         const sum = coinbaseData.reduce((acc, curr) => acc + curr, 0);
    //         const bit10DeFi = sum / 4;
    //         setTotalSum(bit10DeFi);
    //     }
    //     setLoading(false);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [coinbaseData, coinMarketCapData]);

    const refreshData = () => {
        fetchBTCPrice();
        toast.info('Data refreshed');
        setRotate(true);
        setTimeout(() => setRotate(false), 1000);
    }

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            bit10_amount: '1'
        },
    });

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        try {
            // setSwaping(true);
            console.log(values);
            toast.error('You don\'t have enough DOT to swap. Please try again!');
        } catch (error) {
            setSwaping(false);
            toast.error('An error occurred while processing your request. Please try again!');
        } finally {
            setSwaping(false);
        }
    }

    return (
        <MaxWidthWrapper>
            <div className='flex flex-col py-4 md:py-8 h-full items-center justify-center'>
                {loading ? (
                    <Card className='w-[300px] md:w-[450px] px-2 pt-6 animate-fade-bottom-up'>
                        <CardContent className='flex flex-col space-y-2'>
                            {['h-24', 'h-32', 'h-32', 'h-12'].map((classes, index) => (
                                <Skeleton key={index} className={classes} />
                            ))}
                        </CardContent>
                    </Card>
                ) : (
                    <Card className='w-[300px] md:w-[450px] animate-fade-bottom-up'>
                        <CardHeader>
                            <CardTitle className='flex flex-row items-center justify-between'>
                                <div>Swap</div>
                                <div className='flex flex-row space-x-1'>
                                    <TooltipProvider>
                                        <Tooltip delayDuration={300}>
                                            <TooltipTrigger asChild>
                                                <RotateCw className={`w-5 h-5 cursor-pointer transition-transform ${rotate ? 'animate-spin-fast' : ''}`} onClick={refreshData} />
                                            </TooltipTrigger>
                                            <TooltipContent className='max-w-[18rem] md:max-w-[26rem] text-center'>
                                                Refresh data
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </CardTitle>
                            <CardDescription>P10exchange</CardDescription>
                            <div className='text-center'>
                                Current P10 token price is $ {totalSum.toFixed(6)}
                            </div>
                        </CardHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} autoComplete='off'>
                                <CardContent className='flex flex-col space-y-2'>
                                    <div className='rounded-lg border-2 py-2 px-6'>
                                        <p>Pay with</p>
                                        <div className='grid md:grid-cols-2 gap-y-2 md:gap-x-2 items-center justify-center py-2 w-full'>
                                            <div className='text-4xl text-center md:text-start'>
                                                {((parseInt(form.watch('bit10_amount')) * parseFloat(totalSum.toFixed(4))) / parseFloat(btcAmount)).toFixed(4)}
                                            </div>
                                            <div className='flex flex-row items-center'>
                                                <div className='py-1 px-2 mr-6 border-2 rounded-l-full z-10 w-full'>
                                                    <div className='pl-4 py-1'>
                                                        DOT
                                                    </div>
                                                </div>
                                                <div className='-ml-12 z-20'>
                                                    <Image src='/swap/polkadot.svg' alt='BTC' width={75} height={75} className='z-20 bg-white rounded-full p-1' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='hidden md:flex flex-col md:flex-row items-center justify-between space-y-2 space-x-0 md:space-y-0 md:space-x-2 text-sm pr-2'>
                                            <div>$ {(parseInt(form.watch('bit10_amount')) * parseFloat(totalSum.toFixed(4))).toFixed(4)}</div>
                                            <div>
                                                1 DOT = $ {parseFloat(btcAmount).toLocaleString(undefined, { minimumFractionDigits: 3 })}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='rounded-lg border-2 py-2 px-6'>
                                        <p>Receive</p>
                                        <div className='grid md:grid-cols-2 gap-y-2 md:gap-x-2 items-center justify-center py-2 w-full'>
                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name='bit10_amount'
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <FormControl>
                                                                    <SelectTrigger className='dark:border-white'>
                                                                        <SelectValue placeholder='Select number of tokens' />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {bit10Amount.map((number) => (
                                                                        <SelectItem key={number} value={number}>
                                                                            {number}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className='flex flex-row items-center'>
                                                <div className='py-1 px-2 mr-6 border-2 rounded-l-full z-10 w-full'>
                                                    <div className='pl-4 py-1'>
                                                        P10
                                                    </div>
                                                </div>
                                                <div className='-ml-12 z-20'>
                                                    <Image src='/swap/polkadot.svg' alt='bit10' width={75} height={75} className='z-20 bg-white rounded-full p-1' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='hidden md:flex flex-col md:flex-row items-center justify-between space-y-2 space-x-0 md:space-y-0 md:space-x-2 text-sm pr-2'>
                                            <div>$ {(parseInt(form.watch('bit10_amount')) * parseFloat(totalSum.toFixed(4))).toFixed(4)}</div>
                                            <div>
                                                1 P10 = $ {totalSum?.toFixed(4)}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className='flex flex-row space-x-2 w-full items-center'>
                                    <Button className='w-full' disabled={!selectedAccount || swaping || ((parseInt(form.watch('bit10_amount')) * parseFloat(totalSum.toFixed(4))) / parseFloat(btcAmount)) < 0.00002 || Number.isNaN((parseInt(form.watch('bit10_amount')) * parseFloat(totalSum.toFixed(4))) / parseFloat(btcAmount))} >
                                        {swaping && <Loader2 className='animate-spin mr-2' size={15} />}
                                        {swaping ? 'Swaping...' : 'Swap'}
                                    </Button>
                                </CardFooter>
                            </form>
                        </Form>
                    </Card>
                )}
            </div>
        </MaxWidthWrapper>
    )
}
