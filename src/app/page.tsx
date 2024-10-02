import React from 'react';
import Link from 'next/link';
import { ConnectWallet } from './components/ConnectWallet';
import { NetworkSwitcher } from './components/NetworkSwitcher';
import { ReadContract } from './components/ReadContract';
import { WriteContract } from './components/WriteContract';

interface Crypto {
  id: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}

async function getCryptoData(): Promise<Crypto[]> {
  const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}


export default async function Home() {
  const cryptos = await getCryptoData();

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between">
        <NetworkSwitcher />
        <div className="flex gap-3">
          <ConnectWallet />
        </div>
      </div>
      <ReadContract />
      <WriteContract />
      <h1 className="text-3xl font-bold text-center mb-6">Cryptocurrency Prices</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cryptos.map((crypto: Crypto) => (
          <Link key={crypto.id} href={`/crypto/${crypto.id}`}>
            <div className="cursor-pointer bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <img
                  src={crypto.image}
                  alt={crypto.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <h2 className="text-xl font-semibold">{crypto.name}</h2>
              </div>
              <p className="mt-2 text-gray-700">Price: ${crypto.current_price.toFixed(2)}</p>
              <p className="mt-1 text-gray-500">Market Cap: ${crypto.market_cap.toLocaleString()}</p>
              <p className="mt-1 text-gray-500">
                24h Change:{" "}
                <span
                  className={crypto.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}
                >
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
