"use client";

import Image from 'next/image';
import './coin-logo.css';

export function CoinLogo() {
  return (
    <div className="coin-container">
      <div className="coin">
        <div className="coin-face coin-front">
          <Image
            src="/logo.png"
            alt="Nethaji Yuva Sene Holur Logo"
            width={142}
            height={142}
            className="rounded-full"
          />
        </div>
        <div className="coin-face coin-back">
          <Image
            src="/logo.png"
            alt="Nethaji Yuva Sene Holur Logo"
            width={142}
            height={142}
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
