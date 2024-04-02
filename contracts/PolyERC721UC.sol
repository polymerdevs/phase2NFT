//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "./base/UniversalChanIbcApp.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PolyERC721UC is UniversalChanIbcApp, ERC721 {
    uint256 public currentTokenId = 0;
    string public tokenURIC4 =
        "https://emerald-uncertain-cattle-112.mypinata.cloud/ipfs/QmZu7WiiKyytxwwKSwr6iPT1wqCRdgpqQNhoKUyn1CkMD3";
    
    IERC20 public polymerToken;
    uint private constant RND_MINT_PAYMENT = 60 * 10**18; // 60 PLT

    event MintAckReceived(address receiver, uint256 tokenId, string message);
    event NFTAckReceived(address voter, address recipient, uint256 voteId);

    enum NFTType {
        POLY1,
        POLY2,
        POLY3,
        POLY4
    }

    mapping(uint256 => NFTType) public tokenTypeMap; // tokenId => NFTType
    mapping(NFTType => string) public tokenURIs; // NFTType => tokenURI
    mapping(NFTType => uint256[]) public typeTokenMap; // NFTType => tokenId[]
    mapping(NFTType => uint256) public nftPrice; // NFTType => price
    mapping(address => uint256[]) private userNFTs; // user => tokenId[]
    mapping(NFTType => uint256) private refundAmount; // NFTType => amount

    constructor(
        address _middleware,
        address _polyERC20Address,
        string memory _nftName,
        string memory _symbol
    ) UniversalChanIbcApp(_middleware) ERC721(_nftName, _symbol) {
        tokenURIs[NFTType.POLY1] =
            "https://emerald-uncertain-cattle-112.mypinata.cloud/ipfs/QmZu7WiiKyytxwwKSwr6iPT1wqCRdgpqQNhoKUyn1CkMD3";
        tokenURIs[NFTType.POLY2] =
            "https://emerald-uncertain-cattle-112.mypinata.cloud/ipfs/QmZu7WiiKyytxwwKSwr6iPT1wqCRdgpqQNhoKUyn1CkMD3";
        tokenURIs[NFTType.POLY3] =
            "https://emerald-uncertain-cattle-112.mypinata.cloud/ipfs/QmZu7WiiKyytxwwKSwr6iPT1wqCRdgpqQNhoKUyn1CkMD3";
        tokenURIs[NFTType.POLY4] =
            "https://emerald-uncertain-cattle-112.mypinata.cloud/ipfs/QmZu7WiiKyytxwwKSwr6iPT1wqCRdgpqQNhoKUyn1CkMD3";

        nftPrice[NFTType.POLY1] = 25 * 10**18;
        nftPrice[NFTType.POLY2] = 50 * 10**18;
        nftPrice[NFTType.POLY3] = 75 * 10**18;
        nftPrice[NFTType.POLY4] = 100 * 10**18;

        refundAmount[NFTType.POLY1] = 5 * 10**18;
        refundAmount[NFTType.POLY2] = 10 * 10**18;
        refundAmount[NFTType.POLY3] = 15 * 10**18;
        refundAmount[NFTType.POLY4] = 20 * 10**18;

        polymerToken = IERC20(_polyERC20Address);
    }

    function mint(address recipient, NFTType pType) internal returns (uint256) {
        currentTokenId += 1;
        uint256 tokenId = currentTokenId;
        tokenTypeMap[tokenId] = pType;
        typeTokenMap[pType].push(tokenId);
        userNFTs[recipient].push(tokenId);
        _safeMint(recipient, tokenId);
        return tokenId;
    }

    function removeTokenIdFromTypeTokenMap(uint256 tokenId, NFTType nftType) internal {
        uint256[] storage tokenIds = typeTokenMap[nftType];
        for (uint256 i = 0; i < tokenIds.length; i++) {
            if (tokenIds[i] == tokenId) {
                tokenIds[i] = tokenIds[tokenIds.length - 1];
                tokenIds.pop();
                return; 
            }
        }
    }

    function randomMint() internal view returns (NFTType) {
        uint256 random = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % 100;
        NFTType pType = NFTType.POLY1;
        if (random >= 40 && random < 70) {
            pType = NFTType.POLY2;
        } else if (random >= 70 && random < 90) {
            pType = NFTType.POLY3;
        } else if (random >= 90) {
            pType = NFTType.POLY4;
        }
        return pType;
    }

    function burnNFT(uint256 tokenId) internal {
        _requireMinted(tokenId);
        _burn(tokenId);
        removeTokenIdFromTypeTokenMap(tokenId, tokenTypeMap[tokenId]);
        delete tokenTypeMap[tokenId];
    }

    function transferFrom(address from, address to, uint256 tokenId) public virtual override {
        revert("Transfer not allowed");
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireMinted(tokenId);
        return tokenURIs[tokenTypeMap[tokenId]];
    }

    function updateTokenURI(string memory _newTokenURI) public {
        tokenURIC4 = _newTokenURI;
    }

    function getTokenId() public view returns (uint256) {
        return currentTokenId;
    }

    function crossChainMint(address destPortAddr, bytes32 channelId, uint64 timeoutSeconds, NFTType tokenType)
        external
    {
        bytes memory payload = abi.encode(msg.sender, tokenType);
        uint64 timeoutTimestamp = uint64((block.timestamp + timeoutSeconds) * 1000000000);

        // Check if they have enough Polymer Testnet Tokens to mint the NFT
        // If not Revert

        // Burn the Polymer Testnet Tokens from the sender

        IbcUniversalPacketSender(mw).sendUniversalPacket(
            channelId, IbcUtils.toBytes32(destPortAddr), payload, timeoutTimestamp
        );
    }

    /**
     * @dev Packet lifecycle callback that implements packet receipt logic and returns and acknowledgement packet.
     *      MUST be overriden by the inheriting contract.
     *
     * @param channelId the ID of the channel (locally) the packet was received on.
     * @param packet the Universal packet encoded by the source and relayed by the relayer.
     */
    function onRecvUniversalPacket(bytes32 channelId, UniversalPacket calldata packet)
        external
        override
        onlyIbcMw
        returns (AckPacket memory ackPacket)
    {
        recvedPackets.push(UcPacketWithChannel(channelId, packet));

        // burn first upon minting
        
        (address _caller, string memory packetType) = abi.decode(packet.appData, (address, string));
        uint256 _refundAmount = 0;

        if (keccak256(abi.encodePacked(packetType)) == keccak256(abi.encodePacked('buyNFT'))) {
            // do buy NFT logic
        } else if (keccak256(abi.encodePacked(packetType)) == keccak256(abi.encodePacked('randomNFT'))) {
            uint256[] memory userTokenIds = userNFTs[_caller];

            NFTType nftType = randomMint();

            for (uint256 i = 0; i < userTokenIds.length; i++) {
                if (tokenTypeMap[userTokenIds[i]] == nftType) {
                    // refund
                    _refundAmount = refundAmount[nftType];
                    break;
                }
            }

            if (_refundAmount == 0) {
                // if refund == 0, it means user has no NFT same type
                mint(_caller, nftType);
            }
        }

        return AckPacket(true, abi.encode(_refundAmount));
    }

    /**
     * @dev Packet lifecycle callback that implements packet acknowledgment logic.
     *      MUST be overriden by the inheriting contract.
     *
     * @param channelId the ID of the channel (locally) the ack was received on.
     * @param packet the Universal packet encoded by the source and relayed by the relayer.
     * @param ack the acknowledgment packet encoded by the destination and relayed by the relayer.
     */
    function onUniversalAcknowledgement(bytes32 channelId, UniversalPacket memory packet, AckPacket calldata ack)
        external
        override
        onlyIbcMw
    {
        ackPackets.push(UcAckWithChannel(channelId, packet, ack));

        // decode the counter from the ack packet
        (address caller, uint256 tokenId) = abi.decode(ack.data, (address, uint256));

        emit MintAckReceived(caller, tokenId, "NFT minted successfully");
    }

    /**
     * @dev Packet lifecycle callback that implements packet receipt logic and return and acknowledgement packet.
     *      MUST be overriden by the inheriting contract.
     *      NOT SUPPORTED YET
     *
     * @param channelId the ID of the channel (locally) the timeout was submitted on.
     * @param packet the Universal packet encoded by the counterparty and relayed by the relayer
     */
    function onTimeoutUniversalPacket(bytes32 channelId, UniversalPacket calldata packet) external override onlyIbcMw {
        timeoutPackets.push(UcPacketWithChannel(channelId, packet));
        // do logic
    }
}
