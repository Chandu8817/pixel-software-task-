require("@nomicfoundation/hardhat-toolbox");
require("dotenv/config");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "hardhat",
  networks: {
    
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.RPCKEY}`,
      accounts: [process.env.PRIVATEKEY]
    }
  },
};
