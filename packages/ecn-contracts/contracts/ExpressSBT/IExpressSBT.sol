// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IExpressSBT {
    /** ========== event ========== */
    event ESBTMinted(
        address indexed receiver,
        uint256 indexed tokenId,
        address indexed signer,
        string metadataURI
    );

    event GradeLineUpdated(uint256[] indexed newGradeLine);

    event ApproverUpdated(address indexed admin, address newApprover);

    event NewBaseUri(string indexed baseUri);

    event NewLevelUris(uint256 indexed tokenIds, string indexed uris);

    /** ========== errors ========== */

    // error nullAddress();
    // error notOwnOne();

    /**
     * @dev Returns all minted SBT level.
     *
     * Requirements: tokenId exists.
     */
    function mintedLevels(address account)
        external
        view
        returns (uint256[] memory);

    function mintExpress(
        address receiver,
        string memory metadataURI,
        uint256 expressAmount,
        bytes calldata signature
    ) external;

    /** ========== view functions ========== */
    function mintedLevels(address account)
        external
        view
        virtual
        returns (uint256[] memory levels);

    function checkMintedLevel(address account, uint256 level)
        external
        view
        returns (bool minted);

    function uri(uint256 tokenId)
        external
        view
        virtual
        override
        returns (string memory url);

    function accountURI(uint256 tokenId, address account)
        external
        view
        returns (string memory url);
}
