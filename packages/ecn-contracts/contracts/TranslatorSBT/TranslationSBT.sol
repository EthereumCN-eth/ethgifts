// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import '@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol';
import './ITranslationSBT.sol';
import '@openzeppelin/contracts/utils/Strings.sol';

contract TranslationSBT is EIP712, ERC1155Supply, ITranslationSBT, Ownable {
    using Strings for uint256;

    string private baseUri;

    // @dev one user only get one of in any tokenId
    mapping(address => mapping(uint256 => bool)) public mintedToken;

    constructor(string memory initialUri)
        EIP712('TranslationSBT', '1')
        ERC1155(initialUri)
    {
        baseUri = initialUri;
    }

    /** ========== view functions ========== */

    /**
     * @dev Returns the metaData Link of the tokenId.
     *
     * Requirements: tokenId exists.
     */
    function uri(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory url)
    {
        if (!exists(tokenId)) {
            revert TokenNotExist();
        }

        url = bytes(baseUri).length != 0
            ? string(abi.encodePacked(baseUri, tokenId.toString(), '.json'))
            : super.uri(tokenId);
    }

    /** ========== main functions ========== */
    function grantTranslation(address receiver, uint256 tokenId)
        external
        virtual
        override
        onlyOwner
    {
        if (mintedToken[receiver][tokenId]) {
            revert TokenMinted();
        }
        // mint translation SBT
        _mint(receiver, tokenId, 1, '');

        mintedToken[receiver][tokenId] = true;

        emit TranslationMint(receiver, tokenId);
    }

    /** ========== admin functions ========== */
    function setBaseUri(string memory _baseUri) external onlyOwner {
        if (bytes(_baseUri).length == 0) {
            revert InvalidUri();
        }

        baseUri = _baseUri;

        emit NewBaseUri(_baseUri);
    }

    /** ========== internal mutative functions ========== */
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override {
        // if sender is a 0 address, this is a mint transaction, not a transfer
        if (from != address(0)) {
            revert IsSoulBoundToken();
        }
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
