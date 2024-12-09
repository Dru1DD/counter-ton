"use client";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useCounterContract } from "../../hooks/use-counter-contract";
import { useTonConnectUI } from "@tonconnect/ui-react";

export default function Home() {
  const [tonConnect] = useTonConnectUI();
  const { value, sendIncrement } = useCounterContract();
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col justify-center items-center p-4">
      <div className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-xl">
        <TonConnectButton className="mb-6" />

        <div className="flex flex-col items-center space-y-4 text-white">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Counter Value
          </h2>
          <div className="text-4xl font-mono bg-gray-800/50 px-6 py-3 rounded-lg">
            {value ?? "Loading..."}
          </div>
        </div>

        <button
          className={`mt-8 w-full px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            tonConnect
              ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transform hover:scale-105"
              : "bg-gray-600 cursor-not-allowed text-gray-400"
          }`}
          onClick={() => {
            sendIncrement();
          }}
          disabled={!tonConnect.connected}
        >
          Increment
        </button>
      </div>
    </div>
  );
}
