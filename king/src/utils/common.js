import Vue from 'vue'
import Web3 from 'web3'

import KingBuild from '../../../build/contracts/King.json'

let web3
let accounts

let networkId = 8995

let King
let Razor

let RazorAbi =  [
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "jobs",
      "outputs": [
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
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "results",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
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
      "inputs": [
        {
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
      "inputs": [
        {
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "getResult",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "getJob",
      "outputs": [
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
            gasPrice: 0
        })
        Razor = new web3.eth.Contract(RazorAbi, '0x1AE452c743791f0265611A3647deBEB2857a401d', {
            transactionConfirmationBlocks: 0,
            gas: 5000000,
            gasPrice: 0
        })

    }
}

export const EventBus = new Vue()

export const findKing = () => {
    return King.methods.findKing().send({
        from: accounts[0],
        gas: 5000000,
        gasPrice: 0

    })
}

export const addDatafeed = (id) => {
    return King.methods.addFeed(id).send({
        from: accounts[0],
        gas: 5000000,
        gasPrice: 0
    })
}

export const getKing = () => {
    return King.methods.king().call({
        from: accounts[0],
        gas: 5000000,
        gasPrice: 0
    })
}

export const getJobs = async () => {
    let numJobs = await King.methods.numJobs().call({
        from: accounts[0],
        gas: 5000000,
        gasPrice: 0
    })
    let jobs = []
    let job
    for (let i = 0; i < numJobs; i++) {
        job = await King.methods.jobs(i).call({
            from: accounts[0],
            gas: 5000000,
            gasPrice: 0
        })
        jobs.push(job)
    }
    return jobs
}

export const getJob = async (id) => {
    return Razor.methods.getJob(id).call({
        from: accounts[0],
        gas: 5000000,
        gasPrice: 0
    })
}

export const test = async () => {
    return Razor.methods.getJob(1).call({
        from: accounts[0]
    })
}
