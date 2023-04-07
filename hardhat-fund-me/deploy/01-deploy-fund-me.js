const { network } = require("hardhat")
const { networkConfig } = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    console.log("Hiii!!!")
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    const ethUsdPriceFeedAddress = networkConfig[chainId][ethUsdPriceFeed]

    // what happenss when we want to change chains
    // when going for localhost or hardhat network we want to use a mock

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress], //put price feed address
        logs: true,
    })
}
