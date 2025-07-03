"use client";

import { Users } from 'lucide-react';
import './coin-logo.css';

export function CoinLogo() {
  return (
    <div className="coin-container">
      <div className="coin">
        <div className="coin-face coin-front">
          <Users className="h-24 w-24 sm:h-32 sm:w-32 text-primary" />
        </div>
        <div className="coin-face coin-back">
          <span className="font-headline text-5xl sm:text-6xl font-bold text-primary">NYS</span>
        </div>
      </div>
    </div>
  );
}
