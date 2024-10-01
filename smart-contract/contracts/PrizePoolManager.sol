// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PrizePoolManager {
    struct Pool {
        uint size; // Current pool size in wei
        uint ticketPrice; // Cost of a ticket in wei
        uint maxPoolSize; // Maximum size of the pool in wei
        bool allowMultipleTickets; // Determines if multiple tickets per user are allowed
        address[] participants; // List of participants
        mapping(address => uint) entries; // Tracks the number of tickets per user
    }

    mapping(uint => Pool) public pools;
    uint public poolCount;
    address public owner;
    uint public feePercent = 10;  // 10% fee

    constructor() {
        owner = msg.sender;
    }

    function createPool(uint ticketPrice, uint maxPoolSize, bool allowMultipleTickets) external {
        require(msg.sender == owner, "Only owner can create pools");

        pools[poolCount].ticketPrice = ticketPrice;
        pools[poolCount].maxPoolSize = maxPoolSize;
        pools[poolCount].allowMultipleTickets = allowMultipleTickets;

        poolCount++;
    }

    function enterPool(uint poolId) external payable {
        Pool storage pool = pools[poolId];
        require(msg.value == pool.ticketPrice, "Incorrect ticket price");
        if (!pool.allowMultipleTickets) {
            require(pool.entries[msg.sender] == 0, "Already entered pool");
        }
        require(pool.size + msg.value <= pool.maxPoolSize, "Pool is full");

        if (pool.entries[msg.sender] == 0) {
            pool.participants.push(msg.sender);
        }

        pool.entries[msg.sender] += 1; // Increase the ticket count for the user
        pool.size += msg.value; // Increase the pool size by the ticket price
    }

    // Additional utility functions can be added here
}
