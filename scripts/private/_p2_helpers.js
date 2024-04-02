const fs = require('fs');
const ibcConfig = require("../../ibc.json");

// Function to get the path to the configuration file
function getConfigPath() {
  const path = require('path');
  const configRelativePath = process.env.CONFIG_PATH ? process.env.CONFIG_PATH : 'config.json';
  // console.log(`📔 Using config file at ${configRelativePath}`);
  const configPath = path.join(__dirname, '../..' , configRelativePath);
  return configPath;
}

// Function to update config.json
function updateFactoryDeploy(network, address) {
    try {
        const configPath = getConfigPath();
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        config['phase2']['tokenFactory'][network] = address;
        
        // Write the updated config back to the file
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
        console.log(`🆗 Updated config.json for ERC20 Factory with address ${address} on network ${network}`);
    } catch (error) {
        console.error('❌ Error updating config:', error);
    }
}

function updateTokenDeploy(network, address) {
    try {
        const configPath = getConfigPath();
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        config['phase2']['token'][network] = address;
        
        // Write the updated config back to the file
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
        console.log(`🆗 Updated config.json for ERC20 Token with address ${address} on network ${network}`);
    } catch (error) {
        console.error('❌ Error updating config:', error);
    }
}

function updateFaucetDeploy(network, address) {
    try {
        const configPath = getConfigPath();
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        config['phase2']['faucet'][network] = address;
        
        // Write the updated config back to the file
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
        console.log(`🆗 Updated config.json for ERC20 Token with address ${address} on network ${network}`);
    } catch (error) {
        console.error('❌ Error updating config:', error);
    }
}

module.exports = { 
    getConfigPath,
    updateFactoryDeploy,
    updateTokenDeploy,
    updateFaucetDeploy
};
  
