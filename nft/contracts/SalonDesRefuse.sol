// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SalonDesRefuse is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(uint => string) tokenURIMap;
    // mapping(tokenId => address) buyerAddress;

    constructor() ERC721("SalonDesRefuse", "SDR") public {
    }

    function _setTokenURI(uint newItemId, string memory tokenURI) private {
        tokenURIMap[newItemId] = tokenURI;
    }

    function createNFT(address receiver, string memory tokenURI) public returns (uint256){
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(receiver, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
    
    function getTokenURI(uint _tokenId) public view returns (string memory) {
        return tokenURIMap[_tokenId];
    }
    
    // 경매 로직 어떻게 할건지 생각해야겠다.
//     function buyToken(uint _tokenId) external payable {
//         require(buyerAddress[_tokenId])
//   }
}