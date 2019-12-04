

const HDWalletProvider = require('truffle-hdwallet-provider');

const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();
const skale = fs.readFileSync(".skale").toString().trim();
const infura = fs.readFileSync(".infura").toString().trim();

module.exports = {

  networks: {

    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },

    goerli: {
      provider: () => new HDWalletProvider(mnemonic, 'https://goerli.infura.io/v3/'+infura),
      network_id: 5,       // Ropsten's id
      gas: 8000000,        // Ropsten has a lower block limit than mainnet
      confirmations: 0,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },

    matic: {
      provider: () => new HDWalletProvider(mnemonic, 'https://testnet2.matic.network'),
      network_id: 8995,
      gas: 8000000,
      confirmations: 0,
      timeoutBlocks: 200,
      skipDryRun: true,
      gasPrice:0
    },

    skale: {
      provider: () => new HDWalletProvider(mnemonic, skale),
      network_id: '*',
      gas: 8000000,
      confirmations: 0,
      timeoutBlocks: 200,
      skipDryRun: true,
      gasPrice:0
    },

  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.5.10"    // Fetch exact version from solc-bin (default: truffle's version)
    }
  }
}
