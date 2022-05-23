//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Rent is ERC721, Ownable {
    address originalOwner = msg.sender;
    
    uint256 private amountToClaim;

    uint256 public rentingPrice;
    uint64 public _start;
    uint64 public _end;

    string public uri;
    address multisig;

    uint constant fee = 3;
    IERC20 token;

    mapping(address => uint256) public owners;
    mapping(uint256 => address) public ownedNFTs;  

    constructor(
        string memory name_,
        string memory symbol_,
        string memory uri_,
        address tokenAddress,
        address multisign_
    ) ERC721(name_, symbol_) {
        token = IERC20(tokenAddress);
        uri = uri_;
        multisig = multisign_;
    }

    event Renting(
        address indexed _owner,
        address indexed _beneficiary,
        uint256 _amount
    );

    //beneficiary envía el dinero y se guarda en el contrato segun los terminos
    //owner envía nft

    function mint(uint256 tokenId) external onlyOwner {
        _mint(originalOwner, tokenId);
    }

    function getNFT(address _beneficiary) public view returns (uint) {
        return owners[_beneficiary];
    }
    
    function getOwnership(uint _tokenId) public view returns (address) {
        return ownedNFTs[_tokenId];
    }
    
    // posiblemente va en el front
    function _calculateFeeAndFinalPrice (uint256 _rentingPrice) internal pure returns (uint256 , uint256) {
        uint256 contractFee = _rentingPrice / 100 * fee;
        uint256 finalRentingPrice = _rentingPrice - contractFee;
        return (contractFee, finalRentingPrice);
    }

    function rent(
        uint _rentingPrice,
        address _beneficiary,
        uint tokenId
    ) public payable {
        ( , uint256 taxedRent ) = _calculateFeeAndFinalPrice(_rentingPrice);

        approve(originalOwner, tokenId);
        transferFrom(originalOwner, _beneficiary, tokenId);

        token.transferFrom(originalOwner, _beneficiary,  taxedRent);
        emit Renting(originalOwner, _beneficiary, _rentingPrice);
    }

    function exit(address _beneficiary) public {
        transferFrom(_beneficiary,originalOwner, tokenId);
    }

    /* claims the money */
    function claim() external onlyOwner {
        /// faltan checks
        uint256 convertionRate = 86400000;
        require(block.timestamp - _start / convertionRate >= 30, "Expired");

        // cómo sabe que tiene un amount??
        token.transferFrom(address(this), originalOwner, rentingPrice);
    }
}
