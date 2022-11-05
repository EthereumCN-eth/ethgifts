// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract The_Merge_Watch_Party is ERC721 {
  using Strings for uint256;
  using Counters for Counters.Counter;

  Counters.Counter public counters;

  string public baseUri;

  uint256 public totalMetadata;

  mapping(uint256 => uint256) public tokenMetadata;
  mapping(address => string) public userMessage;

  constructor(string memory _baseUri, uint256 _totalMetadata)
    ERC721('The Merge Watch Party', 'The Merge Watch Party')
  {
    baseUri = _baseUri;
    totalMetadata = _totalMetadata;
  }

  /** ========== view functions ========== */
  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(tokenId),
      'ERC721Metadata: URI query for nonexistent token'
    );

    uint256 metadataId = tokenMetadata[tokenId];
    string memory baseURI = _baseURI();
    return
      bytes(baseURI).length > 0
        ? string(abi.encodePacked(baseURI, metadataId.toString(), '.json'))
        : '';
  }

  function totalSupply() public view returns (uint256) {
    return counters.current();
  }

  /** ========== main functions ========== */
  function mint(string memory _message) external {
    require(bytes(userMessage[msg.sender]).length == 0, 'only allow mint once');

    // get tokenId
    uint256 currentTokenId = counters.current();
    counters.increment();

    // generate token metadata
    uint256 metadataId = _randomMetaData(currentTokenId, _message);
    tokenMetadata[currentTokenId] = metadataId;

    // record user message
    userMessage[msg.sender] = _message;

    // mint nft
    _mint(msg.sender, currentTokenId);

    // emit event
    emit Minted(msg.sender, currentTokenId, metadataId, _message);
  }

  /** ========== internal functions ========== */
  function _baseURI() internal view virtual override returns (string memory) {
    return baseUri;
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal virtual override {
    require(from == address(0), 'SBT: only allow first mint');
    super._beforeTokenTransfer(from, to, tokenId);
  }

  function _randomMetaData(uint256 tokenId, string memory _message)
    internal
    view
    returns (uint256 metadataId)
  {
    // cause the random number is only limited in totalChoices that cancel safe math check to save a little gas
    unchecked {
      metadataId =
        (uint256(
          keccak256(
            abi.encodePacked(
              'random mint: ',
              _message,
              'and the tokenId is: ',
              tokenId.toString()
            )
          )
        ) % totalMetadata) +
        1;
    }
  }

  /** ========== event ========== */
  event Minted(
    address indexed account,
    uint256 indexed tokenId,
    uint256 indexed metadataId,
    string message
  );
}
