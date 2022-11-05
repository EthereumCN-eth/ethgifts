//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import '@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import './interfaces/IExpressSBT.sol';

contract ExpressSBT is EIP712, ERC721Enumerable, IExpressSBT, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter internal tokenCounters;

    // signer to all mint signature.
    address public approver;

    // part of signature
    bytes32 public constant EXPRESS_TYPEHASH =
        keccak256(
            'mintExpress(address receiver,string metadataURI,uint256 expressAmount)'
        );

    // Mapping to tokenId's separate URI.
    mapping(uint256 => string) internal _SBTURI;

    // Mapping to account's express amount.
    mapping(address => uint256) internal _ExpressCounters;

    // Mapping tokenId to SBT level, Levels: 1,2,3
    mapping(uint256 => uint256) internal _tokenIdSBTLevel;

    // Mapping level to SBT image URI
    mapping(uint256 => string) internal _SBTimageURI;

    // Mapping account to minted Levels
    mapping(address => uint256[]) internal _mintedLevels;

    // grade line of express SBT, initial setting is [20,100,300]
    uint256[] public gradeLine;

    constructor(address _approver, uint256[] memory _gradeLine)
        EIP712('ExpressSBT', '1')
        ERC721('ExpressSBT', 'ETHGifts')
    {
        _updateGradeLine(_gradeLine);
        approver = _approver;
    }

    /** ========== view functions ========== */

    /**
     * @dev Returns all minted SBT level.
     *
     * Requirements: tokenId exists.
     */
    function mintedLevels(address account)
        public
        view
        virtual
        override
        returns (uint256[] memory)
    {
        return _mintedLevels[account];
    }

    /**
     * @dev Returns the metaData Link of the tokenId.
     *
     * Requirements: tokenId exists.
     */
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(_exists(tokenId), 'URI query for nonexistent token');

        return _SBTURI[tokenId];
    }

    /**
     * @dev Returns the SBT level of the tokenId.
     *
     * Requirements: tokenId exists.
     */
    function tokenLevel(uint256 tokenId)
        public
        view
        virtual
        override
        returns (uint256)
    {
        require(_exists(tokenId), 'URI query for nonexistent token');

        return _tokenIdSBTLevel[tokenId];
    }

    /**
     * @dev Returns the SBT display of the tokenId.
     *
     * Requirements: tokenId exists.
     */
    function expressURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(_exists(tokenId), 'URI query for nonexistent token');

        return _SBTimageURI[_tokenIdSBTLevel[tokenId]];
    }

    /**
     * @dev Returns the gradeLine of each level
     */
    function expressGradeLine()
        public
        view
        virtual
        override
        returns (uint256[] memory)
    {
        return gradeLine;
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
        (bool _avaiable, uint256 mintableLevel) = _avaiableMintLevel(
            receiver,
            expressAmount
        );
        require(
            _avaiable,
            'you are not available to mint, or you have minted all level SBT'
        );

        // update tokenId
        uint256 mintingTokenId = tokenCounters.current();
        tokenCounters.increment();

        // update account status
        _syncStatus(
            receiver,
            mintingTokenId,
            expressAmount,
            metadataURI,
            mintableLevel
        );

        // mint SBT
        _mint(receiver, mintingTokenId);

        emit ESBTMinted(receiver, mintingTokenId, approver);
    }

    /** ========== admin functions ========== */

    function updateSBTURI(uint256 level, string memory newURI)
        public
        onlyOwner
    {
        require(gradeLine[level] != 0, 'the target level is inexistent');

        _SBTimageURI[level] = newURI;

        emit LevelURISet(level, newURI);
    }

    function updateSBTURIs(string[] memory newURIs) external onlyOwner {
        require(
            newURIs.length == gradeLine.length,
            'the length of newURIs is invalid'
        );

        for (uint256 i = 0; i < newURIs.length; i++) {
            updateSBTURI(i, newURIs[i]);
        }
    }

    function addLevel(uint256 newGradeLine) external onlyOwner {
        require(
            newGradeLine > gradeLine[gradeLine.length - 1],
            'new gradeLine is lower than the previous one'
        );

        gradeLine.push(newGradeLine);

        emit GradeLineUpdated(gradeLine);
    }

    function updateApprover(address _newApprover) external onlyOwner {
        require(_newApprover != address(0), 'Invalid address');

        approver = _newApprover;

        emit ApproverUpdated(msg.sender, _newApprover);
    }

    /** ========== internal mutative functions ========== */

    /**
     * @dev update all related status after mint requirements pass through.
     * @param receiver the address which receive the minting SBT
     * @param tokenId the tokenId which will be sent to receiver address
     * @param expressAmount the express amount
     * @param metadataURI metaData of the tokenId and it will include receiver's all contributions of ecn express.
     * @param mintingLevel which the express SBT level
     */
    function _syncStatus(
        address receiver,
        uint256 tokenId,
        uint256 expressAmount,
        string memory metadataURI,
        uint256 mintingLevel
    ) internal {
        _ExpressCounters[receiver] = expressAmount;
        _SBTURI[tokenId] = metadataURI;
        _tokenIdSBTLevel[tokenId] = mintingLevel;
        _mintedLevels[receiver].push(mintingLevel);

        emit StatusUpdated(
            receiver,
            tokenId,
            expressAmount,
            mintingLevel,
            metadataURI
        );
    }

    function _updateGradeLine(uint256[] memory _newGradeLine) internal {
        for (uint256 i = 0; i < _newGradeLine.length; i++) {
            gradeLine.push(_newGradeLine[i]);
        }
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {
        // if sender is a 0 address, this is a mint transaction, not a transfer
        require(from == address(0), 'ESBT: TOKEN IS SOUL BOUND');
        super._beforeTokenTransfer(from, to, tokenId);
    }

    /** ========== internal view functions ========== */
    function _avaiableMintLevel(address account, uint256 expressAmount)
        internal
        view
        returns (bool available, uint256 mintableLevel)
    {
        uint256 balance = balanceOf(account);
        uint256[] memory levels = mintedLevels(account);

        require(
            balance != gradeLine.length,
            'account has minted all level SBT'
        );

        // check if account holds minting level SBT
        uint256 mintableHighestLevel = _mintableHighestLevel(expressAmount);
        if (levels.length != 0) {
            for (uint256 i = 0; i < levels.length; i++) {
                require(
                    levels[i] != mintableHighestLevel,
                    'you have minted this level'
                );
            }
        }

        available = mintableHighestLevel != 0;
        mintableLevel = mintableHighestLevel;
    }

    function _mintableHighestLevel(uint256 expressAmount)
        internal
        view
        returns (uint256 level)
    {
        for (uint256 i = 0; i < gradeLine.length; i++) {
            if (expressAmount >= gradeLine[i]) {
                level = i + 1;
            }
        }
    }
}
