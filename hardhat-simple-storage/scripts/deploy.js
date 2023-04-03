const { ethers, run, network } = require("hardhat")

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying contract...")
    const SimpleStorage = await SimpleStorageFactory.deploy()
    await SimpleStorage.deployed()

    console.log(`Deployed contract to: ${SimpleStorage.address}`)

    // what happens when we deploy to our hardhat network?
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for 6 blocks confirmation...")
        await SimpleStorage.deployTransaction.wait(6)
        await verify(SimpleStorage.address, [])
    }

    const currentValue = await SimpleStorage.retrieve()
    console.log(`Current value is: ${currentValue}`)

    //update current value
    const transactionResponse = await SimpleStorage.store("7")
    await transactionResponse.wait(1)

    const updatedValue = await SimpleStorage.retrieve()
    console.log(`Updated value is: ${updatedValue}`)
}

async function verify(contractAddress, args) {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified")
        } else {
            console.log(e)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
