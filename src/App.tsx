import './App.css'
import  { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';


import '@solana/wallet-adapter-react-ui/styles.css';
import RequestAirdrop from './RequestAirdrop';

const App : FC = () => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint =  useMemo(() => clusterApiUrl(network) , [network])
    return (
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <WalletMultiButton />
            <WalletDisconnectButton />
            <RequestAirdrop />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>

  )
}

export default App
