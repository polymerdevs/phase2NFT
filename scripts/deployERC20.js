const hre = require("hardhat");
const { getConfigPath, updateTokenDeploy } = require("./private/_p2_helpers");
const { getUcHandlerAddress } = require("./private/_vibc-helpers");

async function main() {

    const contractType = "PolymerERC20";
    const networkName = hre.network.name;

    const configPath = getConfigPath();
    const config = require(configPath);
    const tokenName = config['phase2']['token']['name'];
    const symbol = config['phase2']['token']['symbol'];
    const ucHandlerAddr = getUcHandlerAddress(networkName);

    const contract = await hre.ethers.deployContract(contractType, [tokenName, symbol, ucHandlerAddr]);
    await contract.waitForDeployment();

    console.log(`
        Token ${tokenName} deployed to ${contract.target} on network ${networkName}
    `);
    updateTokenDeploy(networkName, contract.target);
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});