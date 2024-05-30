const { ethers, run, network } = require("hardhat")
require("dotenv").config()

async function main() {
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage")
    console.log("Deploying, please wait...")

    const simpleStorage = await SimpleStorage.deploy()
    //await simpleStorage.deployed() // This waits for the contract to be mined

    console.log(
        `Deployment done, and contract address is: ${simpleStorage.target}`,
    )

    if (network.config.chainId === 11155111 && process.env.EtherScan_API_Key) {
        console.log("conncating to varifivarion plse waite it's tacks wile...")
        await simpleStorage.deploymentTransaction().wait(6)
        await verify(simpleStorage.target, [])
    }

    const currentvalue = await simpleStorage.retrieve()
    console.log(`current value is : ${currentvalue}`)

    //upadte is
    const tracationResponse = await simpleStorage.store(7)
    await tracationResponse.wait(1)

    const updatedValue = await simpleStorage.retrieve()
    console.log(`updated value is : ${updatedValue}`)
}
async function verify(contractAddress, args) {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(error)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
