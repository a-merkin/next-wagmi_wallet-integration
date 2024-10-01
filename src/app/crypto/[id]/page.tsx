import React from 'react';

interface CryptoDetail {
  id: string;
  name: string;
  symbol: string;
  description: {
    en: string;
  };
  image: {
    large: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    price_change_percentage_24h: number;
  };
}

async function getCryptoDetails(id: string): Promise<CryptoDetail> {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const CryptoDetailPage = async ({ params }: { params: { id: string } }) => {
  const crypto = await getCryptoDetails(params.id);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center">
          <img
            src={crypto.image.large}
            alt={crypto.name}
            className="w-16 h-16 rounded-full mr-6"
          />
          <h1 className="text-3xl font-bold">{crypto.name}</h1>
        </div>
        <p className="mt-4 text-gray-700">Symbol: {crypto.symbol.toUpperCase()}</p>
        <p className="mt-2 text-gray-700">Current Price: ${crypto.market_data.current_price.usd}</p>
        <p className="mt-2 text-gray-700">Market Cap: ${crypto.market_data.market_cap.usd.toLocaleString()}</p>
        <p className="mt-2 text-gray-700">
          24h Price Change:{" "}
          <span
            className={crypto.market_data.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}
          >
            {crypto.market_data.price_change_percentage_24h.toFixed(2)}%
          </span>
        </p>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Description</h2>
          <p className="mt-2 text-gray-600">{crypto.description.en || "No description available"}</p>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetailPage;
