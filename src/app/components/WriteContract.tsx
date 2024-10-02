"use client";

import * as React from "react";
import { useWriteContract } from "wagmi";
import { useState } from "react";

export const abi = [
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export function WriteContract() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const [spender, setSpender] = useState('')
  const [amount, setAmount] = useState('')

  function applyWriteContract() {
    writeContract({
      address: "0x4f754e3dfc885e35064bf3359453b3e439e81d81",
      abi,
      functionName: "approve",
      args: [spender as `0x${string}`, BigInt(amount)],
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <label>
        Spender:
        <input
          id="spender"
          type="text"
          placeholder="0x..."
          value={spender}
          onChange={(e) => setSpender(e.target.value)}
          className="border p-2 w-full"
        />
      </label>

      <label>
        Amount:
        <input
          id="amount"
          type="text"
          placeholder="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 w-full"
        />
      </label>

      <button
        onClick={applyWriteContract}
        disabled={isPending}
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        {isPending ? "Confirming..." : "Approve"}
      </button>

      {hash && <div>Transaction Hash: {hash}</div>}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
}