//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

interface IPolyERC20 {
    function mint(address recipient, uint256 amount) external;
    function burn(address recipient, uint256 amount) external;
    function transferFrom(address sender, address recipient, uint256 amount) external;
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}