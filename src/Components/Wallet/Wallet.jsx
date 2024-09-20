import React from 'react';
import './Wallet.css'; // Импортируем CSS для стилизации
import WalletIcon from '../Photo/Wallet.png'
import { TonConnectButton } from '@tonconnect/ui-react';

const Wallet = () => {
  return (
    <div className="wallet">
      <img src={WalletIcon} alt="Wallet Icon" className="wallet-image" />

      <div className="wallet-coming-soon">
        <h3>Coming soon!</h3>
      </div>

      <div style={{ pointerEvents: 'none' }}>
        <TonConnectButton className="wallet-button"></TonConnectButton>
      </div>
    </div>
  );
};

export default Wallet;
