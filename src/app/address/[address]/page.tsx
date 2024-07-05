import { ethers } from "ethers";

import { tokenAddress, abi } from "../../token.json"
import { Contract } from "ethers";

require('dotenv').config();

const infuraUrl = `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`


const getBalance = async (address: string) => {

    const data = JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_getBalance",
        params: [address, "latest"],
        id: 1

    })

    const res = await fetch(
        infuraUrl,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: data
        }
    )
    const resJson = await res.json()
    return resJson.result;
}


const getTokenBalance = async (address: string) => {
    const provider = new ethers.JsonRpcProvider(infuraUrl);
    const contract = new Contract(tokenAddress, abi, provider)
    const balance = ethers.formatUnits(await contract.balanceOf((address)),6)

return balance
    // const tokenBalance = await 
}


export default async function Transaction({ params }: { params: { address: string } }) {


    const balance = await getBalance(params.address)
    const tokenBalance = await getTokenBalance(params.address)

    return (
        <main id="main" >

            <h1 id="title">Blockchain Explorer</h1>

            <div id="header">
                The Ethereum Blockchain explorer is available
            </div>

            <div id="content">
                <div id="address">
                    <div className="field">
                        <div className="name">Address:</div>
                        <div className="value">{params.address}</div>
                    </div>
                    <div className="field">
                        <div className="name">ETH BALANCE:</div>
                        <div className="value">{ethers.formatEther(balance)} ETH</div>
                    </div>

                    <div className="field">
                        <div className="name">USDC BALANCE:</div>
                        <div className="value">{tokenBalance} USDC</div>
                    </div>

                    

                </div>

            </div>

        </main>
    );
}