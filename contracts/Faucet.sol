//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import './interface/IPolyERC20.sol';
import "./base/UniversalChanIbcApp.sol";

contract Faucet is UniversalChanIbcApp {

    uint private constant MIN_INTERVAL = 5 * 60; // 5 minutes
    address public polyERCAddress;
    

    mapping (address => uint256) private lastFaucetAccessTime;

    constructor(address _polyERCAddress, address _middleware) UniversalChanIbcApp(_middleware) {
        polyERCAddress = _polyERCAddress;
    }

    modifier timeIntervalRandomPtsPassed() {
        require(block.timestamp - lastFaucetAccessTime[msg.sender] >= MIN_INTERVAL, "You have to wait 5 minutes to get random points again.");
        _;
    }


    function randomPoints(address destPortAddr, bytes32 channelId, uint64 timeoutSeconds) external timeIntervalRandomPtsPassed {
        uint amount = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % 10 + 1; // random 1-10 tokens
        
        bytes memory payload = abi.encode(msg.sender, amount);

        uint64 timeoutTimestamp = uint64((block.timestamp + timeoutSeconds) * 1000000000);

        IbcUniversalPacketSender(mw).sendUniversalPacket(
            channelId, IbcUtils.toBytes32(destPortAddr), payload, timeoutTimestamp
        );
    }

    function onRecvUniversalPacket(bytes32 channelId, UniversalPacket calldata packet)
        external
        override
        onlyIbcMw
        returns (AckPacket memory ackPacket)
    {
        // Receive faucet action, burn the amount in liquidity pool
        recvedPackets.push(UcPacketWithChannel(channelId, packet));

        (address originalSender, uint amount) = abi.decode(packet.appData, (address, uint));

        // IPolyERC20(polyERCAddress).burn(polyERCAddress, amount); // burn

        return AckPacket(true, abi.encode(originalSender, amount));
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

        (address originalSender, uint amount) = abi.decode(ack.data, (address, uint));

        lastFaucetAccessTime[originalSender] = block.timestamp;
        // IPolyERC20(polyERCAddress).transfer(originalSender, amount);
    }

    function onTimeoutUniversalPacket(bytes32 channelId, UniversalPacket calldata packet) external override onlyIbcMw {
        timeoutPackets.push(UcPacketWithChannel(channelId, packet));
        (address originalSender, uint amount) = abi.decode(packet.appData, (address, uint));

        // IPolyERC20(polyERCAddress).mint(polyERCAddress, amount); // mint if get error
    }

}
