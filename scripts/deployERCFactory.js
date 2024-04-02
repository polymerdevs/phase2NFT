const hre = require("hardhat");
const { updateFactoryDeploy } = require("./private/_p2_helpers");

async function main() {
    const contractType = "PolyERC20Factory";

    const networkName = hre.network.name;
    const facoty = await hre.ethers.deployContract(contractType, []);
    await facoty.waitForDeployment();
    
    console.log(
        `Contract ${contractType} deployed to ${facoty.target} on network ${networkName}`
    );
    updateFactoryDeploy(networkName, facoty.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});