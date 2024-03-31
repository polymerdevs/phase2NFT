//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import '../lib/PolyERC20/solidity/contracts/PolyERC20.sol';

interface IPolyERC20 {
    function mint(address recipient, uint256 amount) external;
    function burn(address recipient, uint256 amount) external;
    function transferFrom(address sender, address recipient, uint256 amount) external;
}