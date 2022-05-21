//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/access/Ownable.sol";

contract Minter is Ownable, ERC721 {
    constructor() {

    }
}