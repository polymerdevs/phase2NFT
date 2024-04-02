// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import './base/UniversalChanIbcApp.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract PolymerERC20 is UniversalChanIbcApp, ERC20 {

    uint private constant MIN_INTERVAL = 5 * 60; // 5 minutes
    mapping (address => uint256) private lastFaucetAccessTime;

    enum ACTION {
        FAUCET,
        BRIDGE
    }

    event TokenMint(address indexed receiver, uint256 amount);
    event BurnLiquidityForBridge(uint256 amount);
    event FaucetSuccess();
    event FaucetFailure();
    event TransferSuccess();
    event TransferFailure();

    constructor(string memory name, string memory symbol, address _middleware) ERC20(name, symbol) UniversalChanIbcApp(_middleware) {
        _mint(address(this), 100000000 * 10 ** decimals());
    }

    modifier timeIntervalRandomPtsPassed() {
        require(block.timestamp - lastFaucetAccessTime[msg.sender] >= MIN_INTERVAL, "You have to wait 5 minutes to get random points again.");
        _;
    }

    function mint(address account, uint256 amount) public virtual onlyOwner {
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) public virtual onlyOwner {
        _burn(account, amount);
    }

    function randomPoints(address destPortAddr, bytes32 channelId, uint64 timeoutSeconds) external timeIntervalRandomPtsPassed {
        uint amount = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % 10 + 1; // random 1-10 tokens
        
        bytes memory payload = abi.encode(msg.sender, amount * 10 ** decimals(), ACTION.FAUCET);

        uint64 timeoutTimestamp = uint64((block.timestamp + timeoutSeconds) * 1000000000);

        IbcUniversalPacketSender(mw).sendUniversalPacket(
            channelId, IbcUtils.toBytes32(destPortAddr), payload, timeoutTimestamp
        );
    }

    function bridgeTo(address destPortAddr, uint256 amount, bytes32 channelId, uint64 timeoutSeconds) public {
        _burn(msg.sender, amount);
        bytes memory payload = abi.encode(msg.sender, amount, ACTION.BRIDGE);

        uint64 timeoutTimestamp = uint64((block.timestamp + timeoutSeconds) * 1000000000);

        IbcUniversalPacketSender(mw).sendUniversalPacket(
            channelId, IbcUtils.toBytes32(destPortAddr), payload, timeoutTimestamp
        );
    }

    function onRecvUniversalPacket(
        bytes32 channelId,
        UniversalPacket calldata packet
    ) external override onlyIbcMw returns (AckPacket memory ackPacket) {
        (address sender, uint256 amount, ACTION action) = abi.decode(packet.appData, (address, uint256, ACTION));

        if (action == ACTION.FAUCET) {
            _burn(address(this), amount); // burn in other chains to keep liquidity stable
            emit BurnLiquidityForBridge(amount);
        } else if (action == ACTION.BRIDGE) {
            _mint(sender, amount); 
            emit TokenMint(sender, amount);
        }

        return AckPacket(true, abi.encode(address(this)));
    }

    function onUniversalAcknowledgement(
        bytes32 channelId,
        UniversalPacket memory packet,
        AckPacket calldata ack
    ) external override onlyIbcMw {
        (address sender, uint256 amount, ACTION action) = abi.decode(packet.appData, (address, uint256, ACTION));
        if (action == ACTION.FAUCET) {
            if (ack.success) {
                emit FaucetSuccess();
                lastFaucetAccessTime[sender] = block.timestamp;
                _transfer(address(this), sender, amount);
            } else {
                emit FaucetFailure();
                _burn(address(this), amount); // if faied, burn the amount in liquidity pool
            }
        } else if (action == ACTION.BRIDGE) {
            if (ack.success) {
                emit TransferSuccess();
            } else {
                emit TransferFailure();
                _mint(sender, amount); // return the amount to the sender if failed
            }
        }
    }

    function onTimeoutUniversalPacket(bytes32 channelId, UniversalPacket calldata packet) external override onlyIbcMw {
        (address sender, uint256 amount, ACTION action) = abi.decode(packet.appData, (address, uint256, ACTION));
        if (action == ACTION.FAUCET) {
            _burn(address(this), amount); // if faied, burn the amount in liquidity pool
        } else if (action == ACTION.BRIDGE) {
            _mint(sender, amount); // return the amount to the sender if failed
        }
    }
}
