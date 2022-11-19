// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract ECN4thAnniversary is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter public counters;
    string public baseURI;

    constructor(string memory __baseUri)
        ERC721('ECN4thAnniversary', 'ECN4thAnniversary')
    {
        baseURI = __baseUri;
    }

    /** ========== view functions ========== */
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        _requireMinted(tokenId);

        string memory baseURI__ = _baseURI();
        return bytes(baseURI__).length > 0 ? baseURI__ : '';
    }

    /** ========== admin functions ========== */
    function resetBaseUri(string memory _baseUri) external onlyOwner {
        require(bytes(_baseUri).length != 0, 'invalid baseUri');

        baseURI = _baseUri;
    }

    function sendMany(address[] memory receivers) external onlyOwner {
        for (uint256 i = 0; i < receivers.length; i++) {
            _mint(receivers[i], counters.current());
            counters.increment();
        }
    }
}
