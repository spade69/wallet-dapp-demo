//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Elon is ERC20 {
  constructor(string memory name, string memory symbol) ERC20(name, symbol) {
    // mint 10000 tokens to msg.sender
    _mint(msg.sender, 10000 * 10**uint(decimals()));
  }
}