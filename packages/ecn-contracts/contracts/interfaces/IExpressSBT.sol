// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IExpressSBT {
    /** ========== event ========== */
    event ESBTMinted(
        address indexed receiver,
        uint256 indexed tokenId,
        address signer,
        string tokenURI
    );

    event GradeLineUpdated(uint256[] indexed newGradeLine);

    event ApproverUpdated(address indexed admin, address newApprover);

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
}
