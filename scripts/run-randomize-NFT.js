const hre = require("hardhat");
const { getConfigPath } = require('./private/_helpers.js');
const { setupIbcPacketEventListener } = require("./private/_events.js");

async function main() {
    const config = require(getConfigPath());
    const networkName = hre.network.name;

    const nftGameAddress = config['phase2']['NFTGame'][networkName];
    const contactType = 'NFTGame';
    console.log(`🗄️  Fetching NFTGame app on ${networkName} at address: ${nftGameAddress}`);
    const nftGameApp = await hre.ethers.getContractAt(`${contactType}`, nftGameAddress);

    const accounts = await hre.ethers.getSigners();

    const destPortAddr = config['phase2']['NFT']['base'];
    const channelId = networkName === 'optimism' ? 'channel-10' : 'channel-11';
    const channelIdBytes = hre.ethers.encodeBytes32String(channelId);
    const timeoutSeconds = 36000;

    // for approval
    const erc20Address = config['phase2']['token'][networkName];
    const erc20Contract = 'PolymerERC20';
    console.log(`🗄️  Fetching ERC20 on ${networkName} at address: ${erc20Address}`);
    const token = await hre.ethers.getContractAt(`${erc20Contract}`, erc20Address);

    const approveTx = await token.approve(
        nftGameAddress,
        hre.ethers.parseUnits('60')
    );
    await approveTx.wait();

    console.log(`Approved ${nftGameAddress} to spend 60 PolyP2`);

    await setupIbcPacketEventListener();
    try {
        const txSent = await nftGameApp.connect(accounts[0]).random(
            destPortAddr,
            channelIdBytes,
            timeoutSeconds
        )
        console.log(txSent.hash);
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