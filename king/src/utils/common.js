import Vue from 'vue'
import Web3 from 'web3'

import KingBuild from '../../../build/contracts/King.json'

let web3
let accounts

let networkId = 8995
let razorAddress
if (process.env.VUE_APP_NETWORK === "matic") {
    razorAddress = '0x49b16f1e15d611DcF87b9A3E51F86C41b2aa56E4'
    networkId = 8995
} else if (process.env.VUE_APP_NETWORK === "skale") {
    razorAddress = '0xFF67C85D2e179fEFb3428Ae6909a9a0C60cF5d09'
    networkId = 1
} else {
    alert('environment variable VUE_APP_NETWORK not set!')
}

let King
let Razor

let RazorAbi = [{
        "constant": true,
        "inputs": [{
            "name": "",
            "type": "uint256"
        }],
        "name": "jobs",
        "outputs": [{
                "name": "url",
                "type": "string"
            },
            {
                "name": "selector",
                "type": "string"
            },
            {
                "name": "name",
                "type": "string"
            },
            {
                "name": "result",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{
            "name": "",
            "type": "uint256"
        }],
        "name": "results",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [{
            "name": "",
            "type": "address"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
                "name": "id",
                "type": "uint256"
            },
            {
                "name": "result",
                "type": "uint256"
            }
        ],
        "name": "setResult",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
                "name": "id",
                "type": "uint256"
            },
            {
                "name": "url",
                "type": "string"
            },
            {
                "name": "selector",
                "type": "string"
            },
            {
                "name": "name",
                "type": "string"
            },
            {
                "name": "result",
                "type": "uint256"
            }
        ],
        "name": "setJob",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{
            "name": "id",
            "type": "uint256"
        }],
        "name": "getResult",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{
            "name": "id",
            "type": "uint256"
        }],
        "name": "getJob",
        "outputs": [{
                "name": "url",
                "type": "string"
            },
            {
                "name": "selector",
                "type": "string"
            },
            {
                "name": "name",
                "type": "string"
            },
            {
                "name": "result",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]

export const enableEth = async () => {
    if (typeof window.ethereum === 'undefined' ||
        typeof window.web3 === 'undefined') {
        alert('Browser does not support ethereum. Consider installing metamask!')
        return false
    } else {
        // In the case the user has MetaMask installed, you can easily
        // ask them to sign in and reveal their accounts:
        accounts = await window.ethereum.enable()
        web3 = new Web3(window.web3.currentProvider)
        King = new web3.eth.Contract(KingBuild.abi, KingBuild.networks[networkId].address, {
            transactionConfirmationBlocks: 0,
            gas: 5000000,
            // gasPrice: 0
        })
        Razor = new web3.eth.Contract(RazorAbi, razorAddress, {})

    }
}

export const EventBus = new Vue()

export const findKing = () => {
    return King.methods.findKing().send({
        from: accounts[0],

    })
}

export const addDatafeed = (id) => {
    return King.methods.addFeed(id).send({
        from: accounts[0],
    })
}

export const getKing = () => {
    return King.methods.king().call({})
}

export const getJobs = async () => {
    let numJobs = await King.methods.numJobs().call({})
    let jobs = []
    let job
    for (let i = 0; i < numJobs; i++) {
        job = await King.methods.jobs(i).call({})
        jobs.push(job)
    }
    return jobs
}

export const getJob = async (id) => {
    return Razor.methods.getJob(id).call({})
}
