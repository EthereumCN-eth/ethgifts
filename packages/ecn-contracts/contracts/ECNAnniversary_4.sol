// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/utils/cryptography/MerkleProof.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract ECNAnniversary_4 is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter public counters;

    bytes32 public merkleRoot;
    address public receiver;
    string public baseURI_;

    constructor() ERC721('ECNAnniversary_4', 'ECNAnniversary_4') {}

    /** ========== view functions ========== */
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI_;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        _requireMinted(tokenId);

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? baseURI : '';
    }

    /** ========== admin functions ========== */
    function initializeEvent(bytes32 _merkleRoot, string memory _baseUri)
        external
        onlyOwner
    {
        baseURI_ = _baseUri;
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
        require(!isClaimed(index), 'airDrop: Drop already claimed.');

        // Verify the merkle proof.
        uint256 _amount = 1;
        bytes32 node = keccak256(abi.encodePacked(index, account, _amount));
        require(
            MerkleProof.verify(merkleProof, merkleRoot, node),
            'airDrop: Invalid proof.'
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
