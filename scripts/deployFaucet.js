const hre = require("hardhat");
const { getConfigPath } = require('./private/_helpers.js');
const { getUcHandlerAddress } = require('./private/_vibc-helpers.js');
const { updateFaucetDeploy } = require("./private/_p2_helpers.js");

async function main() {
    const config = require(getConfigPath());
    const networkName = hre.network.name;

    // The config should have a deploy object with the network name as the key and contract type as the value
    const contractType = 'Faucet';
    let args = [];
    // get MW
    const ucHandlerAddr = getUcHandlerAddress(networkName);
    // get ERC20 address
    const erc20Addr = config['phase2']['token'][networkName];
    args = [...args, erc20Addr, ucHandlerAddr];
  
    const myContract = await hre.ethers.deployContract(contractType, args);

    await myContract.waitForDeployment();

    console.log(
        `Contract ${contractType} deployed to ${myContract.target} on network ${networkName}`
    );
    updateFaucetDeploy(networkName, myContract.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});