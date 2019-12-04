import Vue from 'vue'
import Web3 from 'web3'

import KingBuild from '../../../build/contracts/King.json'

let web3
let accounts

let networkId = 1

let King
let Delegator

let DelegatorAbi =  [
    {
      "constant": true,
      "inputs": [],
      "name": "jobManager",
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
      "constant": true,
      "inputs": [],
      "name": "delegate",
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
          "name": "newDelegateAddress",
          "type": "address"
        }
      ],
      "name": "upgradeDelegate",
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
          "name": "repeat",
          "type": "bool"
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
        King = new web3.eth.Contract(KingBuild.abi, KingBuild.networks[networkId].address)
        Delegator = new web3.eth.Contract(DelegatorAbi, '0x058EF5a3d450A2fac5d24dDc75d516A136AE3f62')

        let id = await web3.eth.net.getId()
        if (id !== 5) return false
        return true
    }
}

export const EventBus = new Vue()

export const getNetwork = async () => {
    let id = await web3.eth.net.getId()
    if (id !== 5) return true
    return false
}

export const findKing = () => {
    return King.methods.findKing().send({
        from: accounts[0]
    })
}

export const addDatafeed = (id) => {
    return King.methods.addFeed(id).send({
        from: accounts[0]
    })
}

export const getKing = () => {
    return King.methods.king().call()
}

export const getJobs = async () => {
    let numJobs = await King.methods.numJobs().call()
    let jobs = []
    let job
    for (let i = 0; i < numJobs; i++) {
        job = await King.methods.jobs(i).call()
        jobs.push(job)
    }
    return jobs
}

export const getJob = async (id) => {
    return Delegator.methods.getJob(id).call()
}
