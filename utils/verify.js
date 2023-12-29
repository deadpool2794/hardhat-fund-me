const { run } = require("hardhat")

module.exports = async (contractAddress, args) => {
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.includes("already verified")) {
            console.log("Contract already verified")
        } else {
            console.log(e)
        }
    }
}
