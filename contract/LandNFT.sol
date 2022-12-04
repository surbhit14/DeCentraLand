// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract LandNFT is ERC721URIStorage{
    using Counters for Counters.Counter;
   Counters.Counter private _tokenIdCounter;
   
  constructor(
    string memory _name,
    string memory _symbol
  ) ERC721(_name, _symbol) {
  }
    function safeMint(address to,string memory ipfsURI) public  {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, ipfsURI);
    }


}