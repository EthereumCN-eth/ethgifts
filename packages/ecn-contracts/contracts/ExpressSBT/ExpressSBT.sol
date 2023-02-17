//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import '@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol';
import './IExpressSBT.sol';
import '@openzeppelin/contracts/utils/Strings.sol';

contract ExpressSBT is EIP712, ERC1155Supply, IExpressSBT, Ownable {
    using Strings for uint256;

    // signer to all mint signature.
    address public approver;

    // part of signature
    bytes32 public constant EXPRESS_TYPEHASH =
        keccak256(
            'mintExpress(address receiver,string metadataURI,uint256 expressAmount)'
        );

    // Mapping account to minted Levels
    mapping(address => uint256[]) internal _mintedLevels;

    // Mapping tokenId and address to user's metadata
    mapping(uint256 => mapping(address => string)) internal _accountUris;

    // grade line of express SBT, initial setting is [20,100,300]
    uint256[] public gradeLine;

    string private baseUri;

    constructor(
        address approver_,
        uint256[] memory gradeLine_,
        string memory initialUri
    ) EIP712('ExpressSBT', '1') ERC1155(initialUri) {
        for (uint256 i = 0; i < gradeLine_.length; i++) {
            gradeLine.push(gradeLine_[i]);
        }
        if (approver_ == address(0)) {
            revert InvalidAddress();
        }

        approver = approver_;
        baseUri = initialUri;
    }

    /** ========== view functions ========== */

    /**
     * @dev Returns all minted SBT level.
     */
    function mintedLevels(address account)
        public
        view
        virtual
        returns (uint256[] memory levels)
    {
        levels = _mintedLevels[account];
    }

    /**
     * @dev Returns SBT level minted or not.
     *
     * Requirements: tokenId exists.
     */
    function checkMintedLevel(address account, uint256 level)
        public
        view
        returns (bool minted)
    {
        uint256 tokenId = level;
        if (!exists(tokenId)) {
            revert TokenNotExist();
        }

        uint256[] memory levels = _mintedLevels[account];
        for (uint8 i = 0; i < levels.length; i++) {
            if (level == levels[i]) {
                minted = true;
            }
        }
    }

    /**
     * @dev Returns the metaData Link of the tokenId.
     *
     * Requirements: tokenId exists.
     */
    function uri(uint256 tokenId)
        public
        view
        virtual
        override(IExpressSBT, ERC1155)
        returns (string memory url)
    {
        unchecked {
            if (tokenId + 1 > gradeLine.length) {
                revert LevelNotSet();
            }
        }

        if (!exists(tokenId)) {
            revert TokenNotExist();
        }

        url = bytes(baseUri).length != 0
            ? string(abi.encodePacked(baseUri, tokenId.toString(), '.json'))
            : super.uri(tokenId);
    }

    /**
     * @dev Returns the metaData Link of the tokenId.
     *
     * Requirements: tokenId exists.
     */
    function accountURI(uint256 tokenId, address account)
        public
        view
        returns (string memory url)
    {
        if (!exists(tokenId)) {
            revert TokenNotExist();
        }

        url = _accountUris[tokenId][account];
    }

    /** ========== main functions ========== */
    function mintExpress(
        address receiver,
        string memory metadataURI,
        uint256 expressAmount,
        bytes calldata signature
    ) external virtual override {
        // verify signature
        bytes32 structHash = keccak256(
            abi.encode(
                EXPRESS_TYPEHASH,
                receiver,
                keccak256(bytes(metadataURI)),
                expressAmount
            )
        );
        bytes32 messageHash = _hashTypedDataV4(structHash);

        address signer = ECDSA.recover(messageHash, signature);

        if (signer != approver) {
            revert InvalidProof();
        }

        // check avaiability to mint, if ture return SBT level
        uint256 mintableTokenId = _checkAvaiableMintLevel(
            receiver,
            expressAmount
        );

        // update account status
        _mintedLevels[receiver].push(mintableTokenId);
        _accountUris[mintableTokenId][receiver] = metadataURI;

        // mint SBT
        _mint(receiver, mintableTokenId, 1, '');

        emit ESBTMinted(receiver, mintableTokenId, approver, metadataURI);
    }

    /** ========== admin functions ========== */

    function addLevel(uint256 newGradeLevel) external onlyOwner {
        _addNewGradeLine(newGradeLevel);

        emit GradeLineUpdated(gradeLine);
    }

    function updateApprover(address _newApprover) external onlyOwner {
        if (_newApprover == address(0)) {
            revert InvalidAddress();
        }

        approver = _newApprover;

        emit ApproverUpdated(msg.sender, _newApprover);
    }

    function setBaseUri(string memory _baseUri) external onlyOwner {
        if (bytes(_baseUri).length == 0) {
            revert InvalidUri();
        }

        baseUri = _baseUri;

        emit NewBaseUri(_baseUri);
    }

    /** ========== internal mutative functions ========== */
    function _addNewGradeLine(uint256 _newGradeLevel) internal {
        if (_newGradeLevel <= gradeLine[gradeLine.length - 1]) {
            revert InvalidNewLevelLine();
        }
        gradeLine.push(_newGradeLevel);
    }

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

    /** ========== internal view functions ========== */
    // check if the account can mint the corresponding tokenId
    function _checkAvaiableMintLevel(address account, uint256 expressAmount)
        internal
        view
        returns (uint256)
    {
        uint256[] memory levels = mintedLevels(account);

        // return ERC1155 tokenId as SBT Levels
        (uint256 mintableTokenId, bool matched) = _mintableTokenId(
            expressAmount
        );
        if (!matched) {
            revert NotLevelMatched();
        }

        if (levels.length != 0) {
            for (uint256 i = 0; i < levels.length; i++) {
                if (levels[i] == mintableTokenId) {
                    revert LevelMinted();
                }
            }
        }

        return mintableTokenId;
    }

    // check which level tokenId can be minted
    function _mintableTokenId(uint256 expressAmount)
        internal
        view
        returns (uint256 id, bool matched)
    {
        for (uint256 i = 0; i < gradeLine.length; i++) {
            if (expressAmount == gradeLine[i]) {
                id = i;
                matched = true;
            }
        }
    }
}
