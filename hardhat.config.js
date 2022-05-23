require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dontenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: process.env.URL,
      account: [process.env.KEY]
    },
    mainnet: { 
      url: process.env.URL_MAIN,
      account: [process.env.KEY]
    }
  },
  etherscan: {
    apiKey: process.env.API_KEY,
  },
};
