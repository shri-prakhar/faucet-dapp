import './App.css'
import  { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';


import '@solana/wallet-adapter-react-ui/styles.css';
import RequestAirdrop from './RequestAirdrop';

const App : FC = () => {
  const wallets = useMemo(() => [
    new PhantomWalletAdapter() 
  ],[])
    return (

      <ConnectionProvider endpoint="https://solana-devnet.g.alchemy.com/v2/oeJC2zWdzz-tzOwCBwHKK">
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <div className="flex items-center grid grid-rows-2  justify-center h-screen bg-gray-900">
              <div className='flex items-center  m-20 mt-40 gap-4'>
                <WalletMultiButton />
                <WalletDisconnectButton />
              </div>
              <div className='mb-140'>
                <RequestAirdrop />
              </div>
              
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>

  )
}

export default App
