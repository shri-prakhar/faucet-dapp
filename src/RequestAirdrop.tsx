import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useRef, useState } from "react";

export default function RequestAirdrop() {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const wallet = useWallet();
    const { connection } = useConnection();
    const [isLoading , Setloading] = useState(false)

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const amountString = inputRef.current?.value.trim();
        const amount = Number(amountString)

        if (!wallet.publicKey){
            alert("Please connect your wallet")
            return
        }

        if (!amount || isNaN(amount) || amount <= 0){
            alert("Please enter valid amount ")
            return
        }

        Setloading(true)
        try {
            await connection.requestAirdrop(wallet.publicKey, LAMPORTS_PER_SOL * amount);
            alert("Airdrop successful");
        } catch (error) {
            console.error("Airdrop failed:", error);
            alert("Airdrop failed. Please try again.");
        } finally {
            Setloading(false);
        }
        }

    return (
         
            <form onSubmit={handleSubmit} className="p-8 rounded-lg bg-gray-600 shadow-md w-140 ">
                <h2 className="text-xl font-semibold text-white text-center mb-4">Airdrop  solana to you wallet</h2>
                <input
                    type="text"
                    placeholder="Enter amount..."
                    ref={inputRef}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md text-white font-bold focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 text-white font-semibold rounded-md transition-all duration-300 ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-800 cursor-pointer'}`}
                >
                    {isLoading ? (
                        <div className="w-8 h-8 border-4 border-t-4 border-white border-solid rounded-full animate-spin mx-auto"></div>
                    ) : (
                        "Request Airdrop"
                    )}
                </button>
        </form>
    );
}
