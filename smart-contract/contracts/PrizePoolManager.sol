// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PrizePoolManager {
    struct Pool {
        uint ticketPrice; // Cost of a ticket in wei
        uint maxPoolSize;
        bool exists;
    }
    address public owner;
    uint public feePercent = 10; // 10% fee

    mapping(uint => Pool) public pools;

    event PoolCreated(uint indexed poolId, uint ticketPrice, uint maxPoolSize);
    event PoolEntered(uint indexed poolId, address indexed participant, uint amount);
    event PoolSettled(uint indexed poolId, address indexed bankAddress, address indexed winnerAddress, uint feeAmount, uint prizeAmount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender; // Set contract deployer as owner
    }

    // Create a new pool (emit an event)
    function createPool(uint poolId, uint ticketPrice, uint maxPoolSize) external {
        require(!pools[poolId].exists, "Pool already exists");
        pools[poolId] = Pool(ticketPrice, maxPoolSize, true);

        emit PoolCreated(poolId, ticketPrice, maxPoolSize);
    }

    // Function to get pool details
    function getPool(uint poolId) external view returns (uint ticketPrice, uint maxPoolSize, bool exists) {
        Pool memory pool = pools[poolId];
        return (pool.ticketPrice, pool.maxPoolSize, pool.exists);
    }

    // Enter a pool by purchasing a ticket
    function enterPool(uint poolId) external payable {
        Pool storage pool = pools[poolId];
        require(pool.ticketPrice != 0, "Pool does not exist");
        require(msg.value == pool.ticketPrice, "Incorrect ticket price");

        emit PoolEntered(poolId, msg.sender, msg.value);
    }

    // Settle a pool and distribute the prize
    function settlePool(uint poolId, address bankAddress, address winnerAddress, uint totalPoolSize) external onlyOwner {
        uint feeAmount = (totalPoolSize * feePercent) / 100;
        uint prizeAmount = totalPoolSize - feeAmount;

        // Use call to send ether to avoid gas limit issues
        (bool bankSuccess, ) = bankAddress.call{value: feeAmount}("");
        require(bankSuccess, "Failed to send fee to bank");

        (bool winnerSuccess, ) = winnerAddress.call{value: prizeAmount}("");
        require(winnerSuccess, "Failed to send prize to winner");

        emit PoolSettled(poolId, bankAddress, winnerAddress, feeAmount, prizeAmount);
    }

    // Fallback function to handle incorrect calls
    fallback() external payable {
        revert("Invalid function call");
    }

    // Receive function to handle plain ether transfers
    receive() external payable {
        revert("Ether transfers not allowed");
    }
}
