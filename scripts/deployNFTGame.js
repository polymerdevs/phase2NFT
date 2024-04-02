const hre = require("hardhat");
const { getConfigPath, updateNFTGameDeploy } = require("./private/_p2_helpers");
const { getUcHandlerAddress } = require("./private/_vibc-helpers");

async function main() {

    const contractType = "NFTGame";
    const networkName = hre.network.name;

    const configPath = getConfigPath();
    const config = require(configPath);
    const ucHandlerAddr = getUcHandlerAddress(networkName);
    const polyERC20Addr = config['phase2']['token'][networkName];

    const contract = await hre.ethers.deployContract(contractType, [polyERC20Addr, ucHandlerAddr]);
    await contract.waitForDeployment();

    console.log(`
        NFTGame deployed to ${contract.target} on network ${networkName}
    `);
    updateNFTGameDeploy(networkName, contract.target);
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});