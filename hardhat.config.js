//const { ethers } = require("hardhat")

const { ethers } = require("ethers")

require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomicfoundation/hardhat-verify")
require("./tasks/block-number")
require("hardhat-gas-reporter")

/** @type import('hardhat/config').HardhatUserConfig */

const sepoliaRpcUrl = process.env.RPC_URL // Make sure to set this environment variable
const privateKey = process.env.Private_Key
const EtherScanAPIKEY = process.env.EtherScan_API_Key
const CoinMarketCapAPI = process.env.Coin_Key

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        sepolia: {
            url: sepoliaRpcUrl, // Corrected property name
            accounts: [`0x${privateKey}`],
            chainId: 11155111,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
        },
    },
    solidity: "0.8.4",

    etherscan: {
        apiKey: {
            sepolia: EtherScanAPIKEY,
        },

        // customChains: [
        //     {
        //         network: "sepolia",
        //         chainId: 11155111,
        //         urls: {
        //             apiURL: "https://eth-sepolia.blockscout.com/api",
        //             browserURL: "https://eth-sepolia.blockscout.com",
        //         },
        //     },
        // ],
    },

    gasReporter: {
        currency: "INR",
        enabled: true,
        outputFile: "gas-report.txt",
        coinmarketcap: CoinMarketCapAPI,
    },
}
