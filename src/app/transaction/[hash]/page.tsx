require('dotenv').config();


import moment from 'moment';
const infuraUrl = `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`

const getTxReceipt = async (hash: string) => {

    const data = JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_getTransactionReceipt",
        params: [hash],
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

const getBlock = async (hash: string) => {

    const data = JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_getBlockByHash",
        params: [hash, false],
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

const getTxHash = async (hash: string) => {

    const data = JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_getTransactionByHash",
        params: [hash],
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

export default async function Transaction({ params }: { params: { hash: string } }) {
    const receipt = await getTxReceipt(params.hash);
    const block = await getBlock(receipt.blockHash);
    const transaction = await getTxHash(params.hash);

    const gasPrice = parseInt(receipt.effectiveGasPrice)
    const gasUsed = parseInt(receipt.gasUsed);
    const txFee = gasPrice * gasUsed

    return (
        <main id="main" >

            <h1 id="title">Blockchain Explorer</h1>

            <div id="header">
                The Ethereum Blockchain explorer is available
            </div>

            <div id="content">
                <div id="transaction">
                    <div className="field">
                        <div className="name">Transaction Hash:</div>
                        <div className="value">{params.hash}</div>
                    </div>
                    <div className="field">
                        <div className="name">Status:</div>
                        <div className="value">{receipt.status === "0x1" ? <span id="success" > <i className="bi bi-check-circle-fill"></i> Success</span> : "Failure"}</div>
                    </div>

                    <div className="field">
                        <div className="name">Block:</div>
                        <div className="value">{Number(receipt.blockNumber)}</div>
                    </div>
                    <div className="field border-bottom">
                        <div className="name">Timestamp:</div>
                        <div className="value"><i className="bi bi-clock"></i> {moment.unix(block.timestamp).fromNow()}({moment.unix(block.timestamp).format('MMM-DD-YYYY hh:mm:ss A UTC')})</div>

                    </div>
                    <div className="field">
                        <div className="name">From:</div>
                        <div className="value">{receipt.from}</div>
                    </div>

                    <div className="field border-bottom">
                        <div className="name">To:</div>
                        <div className="value">{receipt.to}</div>
                    </div>

                    <div className="field">
                        <div className="name">Value:</div>
                        <div className="value">{Number(transaction.value) / 1e18} ETH</div>
                    </div>

                    <div className="field">
                        <div className="name">Transaction Fee:</div>
                        <div className="value">{Number(txFee) / 1e18} ETH</div>
                    </div>

                    <div className="field">
                        <div className="name">Gas Price:</div>
                        <div className="value">{Number(receipt.effectiveGasPrice) / 1e9} Gwei ({(Number(receipt.effectiveGasPrice) / 1e18).toFixed(18)} ETH)</div>
                    </div>


                </div>

            </div>

        </main>
    );
}