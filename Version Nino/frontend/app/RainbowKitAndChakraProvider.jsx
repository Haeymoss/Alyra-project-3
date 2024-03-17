'use client';
import { ChakraProvider } from '@chakra-ui/react'
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  sepolia,
} from '@/utils/sepolia';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
    appName: 'walletTest Project ',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    chains: [sepolia],
    ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

const RainbowKitAndChakraProvider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
                <ChakraProvider>
                    {children}
                </ChakraProvider>
            </RainbowKitProvider>
        </QueryClientProvider>
    </WagmiProvider>
  )
}

export default RainbowKitAndChakraProvider