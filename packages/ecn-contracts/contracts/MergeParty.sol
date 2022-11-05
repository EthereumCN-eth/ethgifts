// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/utils/cryptography/MerkleProof.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import './interfaces/IThe_Merge_Watch_Party.sol';

contract MergeParty is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter public counters;

    bytes32 public merkleRoot;
    address public receiver;
    string public messageBoard;

    // mainnet
    address public constant MergeWatchParty =
        0x333C0D9E898fa551D8f9D07f4cef095C6319d4a6;

    constructor() ERC721('MergeParty MessagesBoard', 'ETHGifts') {}

    /** ========== view functions ========== */
    function _baseURI() internal view virtual override returns (string memory) {
        return messageBoard;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        _requireMinted(tokenId);

        string memory messageBoard_ = _baseURI();
        return bytes(messageBoard_).length > 0 ? messageBoard_ : '';
    }

    // where messages of message board are from
    function urMessages(address account) public view returns (string memory) {
        return IThe_Merge_Watch_Party(MergeWatchParty).userMessage(account);
    }

    /** ========== admin functions ========== */
    /**
     * @dev allow to initialize the event at anytime, but just allow to implement once
     */
    function initializeEvent(bytes32 _merkleRoot, string memory _messageboard)
        external
        onlyOwner
    {
        require(
            _merkleRoot.length != 0,
            'MergeParty: the event has been initialized'
        );
        messageBoard = _messageboard;
        merkleRoot = _merkleRoot;
    }

    // This is a packed array of booleans.
    mapping(uint256 => uint256) private claimedBitMap;

    function isClaimed(uint256 index) public view returns (bool) {
        uint256 claimedWordIndex = index / 256;
        uint256 claimedBitIndex = index % 256;
        uint256 claimedWord = claimedBitMap[claimedWordIndex];
        uint256 mask = (1 << claimedBitIndex);
        return claimedWord & mask == mask;
    }

    function _setClaimed(uint256 index) private {
        uint256 claimedWordIndex = index / 256;
        uint256 claimedBitIndex = index % 256;
        claimedBitMap[claimedWordIndex] =
            claimedBitMap[claimedWordIndex] |
            (1 << claimedBitIndex);
    }

    function claim(
        uint256 index,
        address account,
        bytes32[] calldata merkleProof
    ) external {
        require(!isClaimed(index), 'MergeParty: Drop already claimed.');

        // Verify the merkle proof.
        uint256 _amount = 1;
        bytes32 node = keccak256(abi.encodePacked(index, account, _amount));
        require(
            MerkleProof.verify(merkleProof, merkleRoot, node),
            'MergeParty: Invalid proof.'
        );

        // Mark it claimed and send the merge party nft.
        _setClaimed(index);

        // counting
        uint256 tokenId = counters.current();
        counters.increment();

        // mint
        _safeMint(account, tokenId);

        emit Claimed(index, account, tokenId);
    }

    event Claimed(uint256 indexed index, address account, uint256 tokenId);
}