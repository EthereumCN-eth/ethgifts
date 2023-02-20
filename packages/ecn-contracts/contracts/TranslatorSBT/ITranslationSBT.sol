// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface ITranslationSBT {
    /** ========== event ========== */
    event TranslationMint(address indexed receiver, uint256 indexed tokenId);

    event NewBaseUri(string indexed baseUri);

    /** ========== errors ========== */

    error TokenNotExist();

    error InvalidUri();

    error IsSoulBoundToken();

    error TokenMinted();

    /** ========== main functions ========== */
    function grantTranslation(address receiver, uint256 tokenId) external;

    /** ========== view functions ========== */
}
