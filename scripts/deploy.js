const hre = require("hardhat");
require("dotenv").config();


let ipfs = process.env.IPFS;
let token_usdt = "0x036F3Bc6cA1C4140E473E849Fa9AA3808F055CE9";
let multisign = process.env.MULTISIGN;


let args = [
  "CryptoCRent",
  "RENT",
  ipfs,
  token_usdt,
  multisign
];


async function main() {

  // We get the contract to deploy
  const Rent = await hre.ethers.getContractFactory("Rent");
  const rent = await Rent.deploy(...args);
  await rent.deployed(); //validate Tx
 
  console.log("Rent deployed to:", rent.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
