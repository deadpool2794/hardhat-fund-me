const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts()
    const { deploy, log } = deployments

    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying Mocks")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [8, 200000000000],
        })
        log("MockV3Aggregator deployed!")
        log("--------------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
