import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { Route } from 'react-router-dom';
const queryClient = new QueryClient();

const BASESepoliaTestnet = {
  id: 84532,
  name: 'BASE Sepolia',
  nativeCurrency: { name: 'Base', symbol: 'BASE', decimals: 18, replacedName: 'base' },
  rpcUrls: {
    default: { http: ['https://rpc.notadegen.com/base/sepolia'] },
  }
}

const OPSepoliaTestnet = {
  id: 11155420,
  name: 'Optimism Sepolia',
  nativeCurrency: { name: 'Optimism', symbol: 'OP', decimals: 18, replacedName: 'optimism' },
  rpcUrls: {
    default: { http: ['https://optimism-sepolia.blockpi.network/v1/rpc/public'] },
  }
}

const config = getDefaultConfig({
  appName: 'My App',
  projectId: 'fba08911e2aad64000d0adf60fc08652',
  chains: [BASESepoliaTestnet, OPSepoliaTestnet],
  ssr: false, // If your dApp uses server side rendering (SSR)
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <App />
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
