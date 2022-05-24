require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
import "@nomiclabs/hardhat-ethers";
require("dotenv").config();

console.log(process.env.KEY);
console.log(process.env.URL);

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: process.env.URL,
      account: [process.env.KEY],
      chainId: 4,
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
