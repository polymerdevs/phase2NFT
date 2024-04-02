//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import './base/UniversalChanIbcApp.sol';

contract NFTGame is UniversalChanIbcApp {

    IERC20 public paymentToken;
    uint256 public constant FEE = 60 * 10**18; // 60 tokens
    enum PACKET_TYPE {
        BUY_NFT,
        RANDOMIZE_NFT
    }

    mapping (address => uint256) public deposits; // amount of tokens deposited by each address to get random nft

    event RandomizedNFT(address sender);
    event Refunded(address sender, uint256 amount);

    constructor(address _paymentToken, address _middleware) UniversalChanIbcApp(_middleware) {
        paymentToken = IERC20(_paymentToken);
    }

    function random(address destPortAddr, bytes32 channelId, uint64 timeoutSeconds) external {
        require(paymentToken.transferFrom(msg.sender, address(this), FEE), 'You need to pay 60 tokens to randomize');
        emit RandomizedNFT(msg.sender);
        PACKET_TYPE packetType = PACKET_TYPE.RANDOMIZE_NFT;
        sendUniversalPacket(destPortAddr, channelId, timeoutSeconds, packetType);
    }

    function refund(uint256 amount, address to) internal {
        if (deposits[to] >= amount) {
            deposits[to] -= amount;
            paymentToken.transfer(to, amount);
            emit Refunded(to, amount);
        }
    }

    function sendUniversalPacket(address destPortAddr, bytes32 channelId, uint64 timeoutSeconds, PACKET_TYPE packetType) internal {
        bytes memory payload = abi.encode(msg.sender, packetType == PACKET_TYPE.BUY_NFT ? 'buyNFT' : 'randomNFT');

        uint64 timeoutTimestamp = uint64((block.timestamp + timeoutSeconds) * 1000000000);

        IbcUniversalPacketSender(mw).sendUniversalPacket(
            channelId, IbcUtils.toBytes32(destPortAddr), payload, timeoutTimestamp
        );
    }

    function onUniversalAcknowledgement(bytes32 channelId, UniversalPacket memory packet, AckPacket calldata ack)
        external
        override
        onlyIbcMw
    {
        (address sender, string memory packetType) = abi.decode(packet.appData, (address, string));
        if (keccak256(abi.encodePacked(packetType)) == keccak256(abi.encodePacked('buyNFT'))) {
            if (ack.success) {
                
            } else {
                
            }
        } else if (keccak256(abi.encodePacked(packetType)) == keccak256(abi.encodePacked('randomNFT'))) {
            if (ack.success) {
                (uint256 _refundAmount) = abi.decode(ack.data, (uint256));
                refund(_refundAmount, sender);
            } else {
                refund(FEE, sender); // failed, refund full money
            }
        }

        ackPackets.push(UcAckWithChannel(channelId, packet, ack));
    }

    function onTimeoutUniversalPacket(bytes32 channelId, UniversalPacket calldata packet) external override onlyIbcMw {
        timeoutPackets.push(UcPacketWithChannel(channelId, packet));
        (address sender, string memory packetType) = abi.decode(packet.appData, (address, string));
        if (keccak256(abi.encodePacked(packetType)) == keccak256(abi.encodePacked('buyNFT'))) {

        } else if (keccak256(abi.encodePacked(packetType)) == keccak256(abi.encodePacked('randomNFT'))) {
            refund(FEE, sender); // failed, refund full money
        }
    }


}