const hre = require("hardhat");
const { getConfigPath, updateNFTDeploy } = require("./private/_p2_helpers");
const { getUcHandlerAddress } = require("./private/_vibc-helpers");

async function main() {

    const contractType = "PolyERC721UC";
    const networkName = hre.network.name;

    const configPath = getConfigPath();
    const config = require(configPath);
    const tokenName = config['phase2']['NFT']['name'];
    const symbol = config['phase2']['NFT']['symbol'];
    const ucHandlerAddr = getUcHandlerAddress(networkName);
    const polyERC20Addr = config['phase2']['token'][networkName];

    const contract = await hre.ethers.deployContract(contractType, [ucHandlerAddr, polyERC20Addr, tokenName, symbol]);
    await contract.waitForDeployment();

    console.log(`
        Token ${tokenName} deployed to ${contract.target} on network ${networkName}
    `);
    updateNFTDeploy(networkName, contract.target);
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});