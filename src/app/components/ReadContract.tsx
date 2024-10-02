"use client";

import { readContracts } from "@wagmi/core";
import { config } from "../../../config";
import { useState } from "react";
import { useAccount } from 'wagmi'

const daiContract = {
  abi: [
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    }
  ],
} as const;

export function ReadContract() {
  const [contractAddress, setContractAddress] = useState('0x6B175474E89094C44Da98b954EedeAC495271d0F');
  const [decimals, setDecimals] = useState('');
  const [totalSupply, setTotalSupply] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { chain } = useAccount();

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContractAddress(e.target.value);
  };

  const getContractInfo = async () => {
    if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress)) {
      setError('Некорректный адрес контракта. Адрес должен начинаться с 0x и содержать 42 символа.');
      return;
    }

    try {
      setError('');

      const [decimals, name, totalSupply] = await readContracts(config, {
        contracts: [
          {
            ...daiContract,
            address: contractAddress as `0x${string}`,
            functionName: 'decimals',
          },
          {
            ...daiContract,
            address: contractAddress as `0x${string}`,
            functionName: 'name',
          },
          {
            ...daiContract,
            address: contractAddress as `0x${string}`,
            functionName: 'totalSupply',
          },
        ],
      });

      setDecimals(String(decimals?.result));
      setTotalSupply(String(totalSupply?.result));
      setName(String(name?.result));
    } catch (err) {
      setError('Ошибка вызова контракта. Проверьте сеть или адрес.');
      console.error(err);
    }
  };

  return (
    <div className="flex gap-3 flex-col">
      <label>
        ERC-20 contract address in <span className="text-blue-600">{chain?.name}</span> network:
        <input
          id="contractAddress"
          type="text"
          value={contractAddress}
          onChange={handleAddressChange}
          placeholder="0x..."
          className="border p-2 w-full"
        />
      </label>
      <button
        onClick={getContractInfo}
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Get info
      </button>
      {error && <p className="text-red-600">{error}</p>}
      {decimals && totalSupply && !error ? (
        <div>
          <p>Name: {name}</p>
          <p>Decimals: {decimals}</p>
          <p>Total supply: {totalSupply}</p>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}