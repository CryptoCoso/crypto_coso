const { expect } = require("chai");
const { ethers } = require("hardhat");

let ipfs = "https://ipfs.io/ipfs/QmcXuh9t39hQjvQeDM9zByUaRQRVEtUw47pLnt7NUjcRib";
let token_usdt = "0x036F3Bc6cA1C4140E473E849Fa9AA3808F055CE9";
let multisign = "0x8F85FBE55f8471cdeD45cAbC675920Aa4791c87c";

describe("Rent", function () {
  it("Should be deployed with correct data", function (done) {
    let args = ["CryptoRent", "RENT", ipfs, token_usdt, multisign];
    ethers.getContractFactory("Rent").then(Rent => {
      Rent.deploy(...args).then(rent => {
        rent.deployed().then(() => {
          Promise.all([rent.name(), rent.symbol()]).then(res => {
            expect(res[0]).to.equal("CryptoRent");
            expect(res[1]).to.equal("RENT");
            done();
          }).catch(done);
        }).catch(done);
      }).catch(done);
    }).catch(done);
  });
});
