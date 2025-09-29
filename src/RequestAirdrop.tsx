import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useRef } from "react"

export default function RequestAirdrop(){
    const Inputref = useRef<HTMLInputElement | null>(null)
    const wallet = useWallet();
    const { connection } = useConnection();
    async function handleSubmit(){
        let amount;
        if (Inputref.current){  amount =  Inputref.current.valueAsNumber} 
        
        const publickey = wallet.publicKey as PublicKey;
    if (amount){
        await connection.requestAirdrop(publickey , amount * LAMPORTS_PER_SOL)
    }
    else {
        alert("enter the amount")
    }

    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <input type = "text" placeholder="enter the amount ...." ref={Inputref} />
                <button type="submit" >
                    Request Airdrop 
                </button>
            </form>
        </div>
    )
}