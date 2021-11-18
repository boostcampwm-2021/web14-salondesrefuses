// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SalonDesRefuse is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address public contarctOwner;

    mapping(uint => uint) tokenPrice;
    mapping(uint => Bid) lastBid;

    struct Bid {
        uint price;
        address bidder;
    }

    constructor() ERC721("SalonDesRefuse", "SDR") public {
        contarctOwner = msg.sender;
    }

    function createNFT(address receiver, string memory tokenURI) public returns (uint256){
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(receiver, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function registerArtwork(uint _tokenId) public {
        approve(contarctOwner, _tokenId);
    }

    function bid(uint _tokenId) public payable returns (bool) {
        require(ownerOf(_tokenId) != msg.sender);
        require(lastBid[_tokenId].price < msg.value);

        address prevBidder = lastBid[_tokenId].bidder;
        payable(prevBidder).transfer(lastBid[_tokenId].price);
        lastBid[_tokenId] = Bid(msg.value, msg.sender);

        return true;
    }

    function complete(uint _tokenId) public onlyOwner {
        address tokenOwner = ownerOf(_tokenId);

        require(getApproved(_tokenId) == contarctOwner);

        payable(tokenOwner).transfer(lastBid[_tokenId].price);
        safeTransferFrom(tokenOwner, lastBid[_tokenId].bidder, _tokenId);
        delete lastBid[_tokenId];
    }
}
