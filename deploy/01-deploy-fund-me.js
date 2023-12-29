const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const verify = require("../utils/verify")
require("dotenv").config()

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    // console.log("ChainId: ", chainId)
    let ethUsdPriceFeedAddress
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregrator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregrator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId].priceFeed
    }

    const args = [ethUsdPriceFeedAddress]

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 2,
    })
    log("--------------------------------------------------")
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying on Etherscan.")
        await verify(fundMe.address, args)
    }
}

module.exports.tags = ["all", "fundme"]
