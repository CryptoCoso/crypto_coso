const { ethers } = require("hardhat");
// import { ethers } from "hardhat";
import { Wallet, getDefaultProvider } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { expect } from "chai";
// import { env } from 'process';

let ipfs = "https://ipfs.io/ipfs/QmcXuh9t39hQjvQeDM9zByUaRQRVEtUw47pLnt7NUjcRib";
let token_usdt = "0x036F3Bc6cA1C4140E473E849Fa9AA3808F055CE9";
let multisign = "0x8F85FBE55f8471cdeD45cAbC675920Aa4791c87c";

// Owner of contract
let ownerAddress = "0x4945D70D96d9B645Ac0D4EDF92B60E16E8c37D85";
// Private key of the address above
// 0x51c8dbe7f606ce1b4ba8ba59ddefa18a84f8c59e229b612ee159ef9f0767ca80
// Public key of the address above
// 0x0421c28980005dddfb871c873f931da097bbeff4f4f5f5d80aa5a701b61f565467f3ccb360a3166cf84f925fcf483737d5fc4ba9303e11f0f90d27b377f83ce7a4
// Compressed public key of the address above
// 0x0221c28980005dddfb871c873f931da097bbeff4f4f5f5d80aa5a701b61f565467

describe("Rent contract", function () {
  // new ethers.utils.SigningKey()
  let args = ["CryptoRent", "RENT", ipfs, token_usdt, multisign];
  let wallet: Wallet;

  const deployContract = async (): Promise<Contract> => {
    // Get the signer with mnemonic phrase
    wallet = Wallet.fromMnemonic('fatal sun drill question pair orbit girl brisk dish bottom toast elder').connect(getDefaultProvider('rinkeby'));
    let Rent = await ethers.getContractFactory("Rent", wallet);
    return await Rent.deploy(...args);
  };

  it("Should be deployed with correct name and symbol", async function (done) {
    let rent = await deployContract();
    await rent.deployed();
    let [name, symbol, contractSigner] = await Promise.all([rent.name(), rent.symbol(), rent.signer.getAddress()]);
    console.log({ contractSigner })
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
    console.log({ nft })

    // Expect to go out from the contract to my wallet ???
    expect(nft.from).to.equal(ownerAddress);
    // expect(nft.to).to.equal(signerAddress);
  });
});
