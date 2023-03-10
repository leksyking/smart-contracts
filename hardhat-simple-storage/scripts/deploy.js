const { ethers } = require("hardhat")

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying contract...")
    const SimpleStorage = await SimpleStorageFactory.deploy()
    await SimpleStorage.deployed()

    console.log(`Deployed contract to: ${SimpleStorage.address}`)
}
// 0x5FbDB2315678afecb367f032d93F642f64180aa3
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
