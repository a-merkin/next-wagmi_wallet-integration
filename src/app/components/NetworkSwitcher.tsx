"use client";

import { switchChain } from "@wagmi/core";
import { useAccount } from "wagmi";
import { mainnet, sepolia } from "@wagmi/core/chains";
import { useEffect, useState } from "react";
import { config } from "../../../config";

const EthereumIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-5 h-5 inline-block mr-2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 2l9 16-9-4-9 4 9-16z"
    />
  </svg>
);

export function NetworkSwitcher() {
  const { chain } = useAccount();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <p>Загрузка...</p>;
  }

  function SwitchButton() {
    if (chain) {
      return chain.id == sepolia.id ? (
        <button
          className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-semibold rounded-lg text-sm px-5 py-2.5 mb-2 hover:scale-105 transition-transform focus:ring-4 focus:ring-pink-300 focus:outline-none"
          onClick={() => switchChain(config, { chainId: mainnet.id })}
        >
          <EthereumIcon />
          Переключить на Mainnet
        </button>
      ) : (
        <button
          className="bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold rounded-lg text-sm px-5 py-2.5 mb-2 hover:scale-105 transition-transform focus:ring-4 focus:ring-blue-300 focus:outline-none"
          onClick={() => switchChain(config, { chainId: sepolia.id })}
        >
          <EthereumIcon />
          Переключить на Sepolia
        </button>
      );
    } else {
      return (
        <button
          className="bg-gray-400 text-white font-semibold rounded-lg text-sm px-5 py-2.5 mb-2 cursor-not-allowed"
          disabled
        >
          Не подключено
        </button>
      );
    }
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <p className="text-lg font-semibold mb-4">
        Текущая сеть:{" "}
        <span className="text-blue-600">{chain?.name ?? "Не подключено"}</span>
      </p>
      <SwitchButton />
    </div>
  );
}
