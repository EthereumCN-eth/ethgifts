// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IExpressSBT {
    /** ========== event ========== */
    event ESBTMinted(
        address indexed receiver,
        uint256 indexed tokenId,
        address signer
    );

    event StatusUpdated(
        address indexed receiver,
        uint256 indexed tokenId,
        uint256 expressCounter,
        uint256 SBTLevel,
        string tokenURI
    );

    event LevelURISet(uint256 indexed level, string levelURI);

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
    function currentLevels(address account)
        external
        view
        returns (uint256[] memory);

    /**
     * @dev Returns the SBT level of the tokenId.
     *
     * Requirements: tokenId exists.
     */
    function tokenLevel(uint256 tokenId) external view returns (uint256);

    /**
     * @dev Returns the SBT display of the tokenId.
     *
     * Requirements: tokenId exists.
     */
    function expressURI(uint256 tokenId) external view returns (string memory);

    /**
     * @dev Returns the gradeLine of each level
     */
    function expressGradeLine() external view returns (uint256[] memory);

    /**
     * @dev mint with permission that mint a express to receiver by checking points reaching out the grade line
     * @param receiver receiver address
     * @param metadataURI receiver's contribution will be saved in IPFS(e.g. ipfs://...)
     * @param points total contributions of receiver address which records by approver address
     * @param signature the approver will verify receiver's contributions and sign it offchain
     */
    function mintExpress(
        address receiver,
        string memory metadataURI,
        uint256 points,
        bytes calldata signature
    ) external;
}
