//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract Rent is Ownable {
    address payable originalOwner;
    uint private amountToClaim;
    IERC20 token;
       
    uint public rentingPrice;
    uint64 public _start;
    uint64 public _end;

    constructor() {
        originalOwner = payable(msg.sender);
    }

    //beneficiary envía el dinero y se guarda en el contrato segun los terminos 
    //owner envía nft


    function rent(uint _rentingPrice, address _beneficiary ) public payable {
       token.transferFrom(_beneficiary, address(this), _rentingPrice);

    }

    // the owner claims the money
    function claim() external onlyOwner {
        /// faltan checks
        uint convertionRate = 86400000;
        require( block.timestamp - _start / convertionRate >= 30 , "Expired");

        // cómo sabe que tiene un amount??
        token.transferFrom(address(this), originalOwner ,rentingPrice);
    }

}