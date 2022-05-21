//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
//import "./minter.sol";

contract TermsAndConditions is Ownable {
    address payable owner;
    uint private amountToClaim;
    IERC20 token;

    struct TermsAndConditionsData {       
        uint private constant amount;
        uint64 private immutable _start;
        uint64 private immutable _end;
    }

    TermsAndConditionsData private constant terms;

    constructor() public {
       owner = msg.sender;
    }

    function calculateRemainder(terms t) returns (uint){
        require(t.end< block.timestamp, "Contract has expired");
        uint amountPerDay = t.amount / 30;
        uint remainder = (block.timestamp - t.start)/1000 * amountPerDay;
        return remainder;
    }

    function setTerms(TermsAndConditionsData terms) public {
        require(terms.amount > 0, "Amount must be greater than 0");
        require(terms.start >= block.timestamp, "Start must be greater than 0");
    
        this.terms.start = terms.start;
        this.terms.end = terms.end;
        this.terms.amount = terms.amount;
    } 

    function claim() external onlyOwner {
        require(termsAndConditionsData.amount > 0);
        amountToClaim = calculateRemainder(termsAndConditionsData);
        IERC20(token()).transferFrom(address(this), msg.sender ,amountToClaim);
    }
}