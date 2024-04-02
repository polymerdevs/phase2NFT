const hre = require("hardhat");
const { getConfigPath } = require('./private/_helpers.js');

async function main() {
    const config = require(getConfigPath());
    const networkName = hre.network.name;

    const faucetAddress = config['phase2']['token'][networkName];
    const contactType = 'PolymerERC20';
    console.log(`🗄️  Fetching Faucet app on ${networkName} at address: ${faucetAddress}`);
    const faucetApp = await hre.ethers.getContractAt(`${contactType}`, faucetAddress);

    const accounts = await hre.ethers.getSigners();
    try {
        await faucetApp.connect(accounts[0]).mint(
            accounts[0].address,
            hre.ethers.parseUnits('200'),
        )
        console.log(
            `Faucet on ${networkName}, waiting for the transaction to be finished`
        );
    } catch (e) {
        console.error(e.message);
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});