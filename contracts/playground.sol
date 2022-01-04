pragma solidity ^0.4.21;

contract Playground {
    function blockNumber() public view returns (uint256) {
        return block.number;
    }
}