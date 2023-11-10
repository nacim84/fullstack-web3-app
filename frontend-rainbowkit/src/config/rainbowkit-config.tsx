"use client"
import '@rainbow-me/rainbowkit/styles.css';
import {
 RainbowKitProvider,
 darkTheme,
 getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import {
 hardhat, sepolia
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { ReactNode } from 'react';

interface RainbowKitProviderProps {
 children: ReactNode
}


export const CustomRainbowKitProvider = ({ children }: RainbowKitProviderProps) => {
 const { chains, publicClient } = configureChains(
  [hardhat, sepolia],
  [
   publicProvider()
  ]
 );

 const { connectors } = getDefaultWallets({
  appName: 'My FullStack Web3 App',
  projectId: 'a792d2b1b11567247a777539aa9ffa77',
  chains
 });

 const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient
 })
 return (
  <WagmiConfig config={wagmiConfig}>
   <RainbowKitProvider chains={chains} theme={darkTheme()}>
    {children}
   </RainbowKitProvider>
  </WagmiConfig>
 );
};