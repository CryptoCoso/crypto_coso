// const { ethers } = require("hardhat");
import { ethers } from "hardhat";
import { Wallet, getDefaultProvider } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { expect } from "chai";
// import { env } from 'process';

let ipfs = "https://ipfs.io/ipfs/QmcXuh9t39hQjvQeDM9zByUaRQRVEtUw47pLnt7NUjcRib";
let token_usdt = "0x036F3Bc6cA1C4140E473E849Fa9AA3808F055CE9";
let multisign = "0x8F85FBE55f8471cdeD45cAbC675920Aa4791c87c";

describe("Rent contract", function () {
  // new ethers.utils.SigningKey()
  let args = ["CryptoRent", "RENT", ipfs, token_usdt, multisign];
  let wallet: Wallet;

  const deployContract = async (): Promise<Contract> => {
    // wallet = Wallet.fromMnemonic('vague sniff quarter accuse pilot monster add helmet clip release onion buddy').connect(getDefaultProvider('rinkeby'));
    let Rent = await ethers.getContractFactory("Rent");
    return await Rent.deploy(...args);
  };

  it("Should be deployed with correct name and symbol", async function () {
    let rent = await deployContract();
    await rent.deployed();
    let [name, symbol, contractSigner] = await Promise.all([rent.name(), rent.symbol(), rent.signer.getAddress()]);
    console.log(contractSigner)
    expect(name).to.equal("CryptoRent");
    expect(symbol).to.equal("RENT");
    // expect(contractSigner).to.equal(wallet.address);
  });

  it("Should mint a NFT properly", async function () {
    let rent = await deployContract();
    await rent.deployed();

    // Mint a NFT and wait for the transaction to be mined
    let tsxNFT = await rent.mint(0);
    let nft = await tsxNFT.wait();
    console.log(nft)

    // Expect to go out from the contract to my wallet ???
    // expect(nft.from).to.equal(zeroAddress);
    // expect(nft.to).to.equal(signerAddress);
  });
});
