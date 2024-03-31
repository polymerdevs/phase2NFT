//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "./base/UniversalChanIbcApp.sol";

contract UserPointUC is UniversalChanIbcApp {
    
    uint private constant MIN_INTERVAL = 5 * 60; // 5 minutes

    mapping (address => uint256) private userPoints;
    mapping (address => uint256) private userPointsLastTimestamp;

    constructor(address _middleware) UniversalChanIbcApp(_middleware) {}

    modifier timeIntervalRandomPtsPassed() {
        require(block.timestamp - userPointsLastTimestamp[msg.sender] >= MIN_INTERVAL, "You have to wait 5 minutes to get random points again.");
        _;
    }

    function randomPoints() external timeIntervalRandomPtsPassed returns (uint) {
        uint points = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % 10 + 1;
        userPoints[msg.sender] += points;
        userPointsLastTimestamp[msg.sender] = block.timestamp;
        return points;
    }

    function getUserPoints() external view returns (uint256) {
        return userPoints[msg.sender];
    }
}
