//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import '@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol';
import '@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol';
import '../interfaces/IExpressSBT.sol';

contract ExpressSBT is
    EIP712,
    ERC1155URIStorage,
    ERC1155Supply,
    IExpressSBT,
    Ownable
{
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

    constructor(
        address _approver,
        uint256[] memory _gradeLine,
        string memory initialUri
    ) EIP712('ExpressSBT', '1') ERC1155(initialUri) {
        for (uint256 i = 0; i < _gradeLine.length; i++) {
            gradeLine.push(_gradeLine[i]);
        }
        approver = _approver;
    }

    /** ========== view functions ========== */

    /**
     * @dev Returns all minted SBT level.
     */
    function mintedLevels(address account)
        public
        view
        virtual
        returns (uint256[] memory)
    {
        return _mintedLevels[account];
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
        require(exists(tokenId), 'tokenId not exist');

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
        override(ERC1155, ERC1155URIStorage)
        returns (string memory)
    {
        require(exists(tokenId), 'tokenId not exist');
        return super.uri(tokenId);
    }

    /**
     * @dev Returns the metaData Link of the tokenId.
     *
     * Requirements: tokenId exists.
     */
    function accountURI(uint256 tokenId, address account)
        public
        view
        returns (string memory)
    {
        require(exists(tokenId), 'tokenId not exist');
        return _accountUris[tokenId][account];
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

        require(signer == approver, 'invalid signer');

        // verify avaiable to mint, if ture return SBT level
        (bool available, uint256 mintableLevel) = _avaiableMintLevel(
            receiver,
            expressAmount
        );

        require(available, 'you are not available to mint');

        // update account status
        _mintedLevels[receiver].push(mintableLevel);
        _accountUris[mintableLevel][receiver] = metadataURI;

        // mint SBT
        _mint(receiver, mintableLevel, 1, '');

        emit ESBTMinted(receiver, mintableLevel, approver, metadataURI);
    }

    /** ========== admin functions ========== */

    function addLevel(uint256 newGradeLevel) external onlyOwner {
        _addNewGradeLine(newGradeLevel);

        emit GradeLineUpdated(gradeLine);
    }

    function updateApprover(address _newApprover) external onlyOwner {
        require(_newApprover != address(0), 'Invalid address');

        approver = _newApprover;

        emit ApproverUpdated(msg.sender, _newApprover);
    }

    function setSBTLevelURI(
        uint256[] memory tokenIds,
        string[] memory levelUris
    ) external onlyOwner {
        require(tokenIds.length == levelUris.length, 'length not match');
        for (uint8 i = 0; i < tokenIds.length; i++) {
            _setURI(tokenIds[i], levelUris[i]);
        }
    }

    function setBaseUri(string memory _baseUri) external onlyOwner {
        _setBaseURI(_baseUri);
    }

    /** ========== internal mutative functions ========== */

    function _addNewGradeLine(uint256 _newGradeLevel) internal {
        require(
            _newGradeLevel > gradeLine[gradeLine.length - 1],
            'next level can not lower than the last one'
        );
        gradeLine.push(_newGradeLevel);
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) {
        // if sender is a 0 address, this is a mint transaction, not a transfer
        require(from == address(0), 'ESBT: TOKEN IS SOUL BOUND');
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    /** ========== internal view functions ========== */
    function _avaiableMintLevel(address account, uint256 expressAmount)
        internal
        view
        returns (bool available, uint256 mintableLevel)
    {
        uint256[] memory levels = mintedLevels(account);

        // return ERC1155 tokenId as SBT Levels
        (available, mintableLevel) = _mintableTokenId(expressAmount);

        if (levels.length != 0) {
            for (uint256 i = 0; i < levels.length; i++) {
                require(
                    levels[i] != mintableLevel,
                    'you have minted this level'
                );
            }
        }
    }

    function _mintableTokenId(uint256 expressAmount)
        internal
        view
        returns (bool available, uint256 id)
    {
        for (uint256 i = 0; i < gradeLine.length; i++) {
            if (expressAmount == gradeLine[i]) {
                id = i;
                available = true;
            }
        }
    }
}
