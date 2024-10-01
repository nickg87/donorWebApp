// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PrizePoolManager {

    event PoolCreated(uint indexed poolId, uint ticketPrice, uint maxPoolSize, bool allowMultipleTickets);
    event EnteredPool(uint indexed poolId, address indexed participant, uint ticketsPurchased);
    event PoolSettled(uint indexed poolId, address indexed winner, uint prizeAmount, uint feeAmount);

    struct Pool {
        uint size; // Current pool size in wei
        uint ticketPrice; // Cost of a ticket in wei
        uint maxPoolSize; // Maximum size of the pool in wei
        bool allowMultipleTickets; // Determines if multiple tickets per user are allowed
        address[] participants; // List of participants
        mapping(address => uint) entries; // Tracks the number of tickets per user
        uint totalTickets; // Total tickets purchased for this pool
        bool settled; // Keeps track if the pool is settled
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

        emit PoolCreated(poolCount, ticketPrice, maxPoolSize, allowMultipleTickets);

        poolCount++;
    }

    function enterPool(uint poolId) external payable {
        Pool storage pool = pools[poolId];
        require(msg.value == pool.ticketPrice, "Incorrect ticket price");
        require(!pool.settled, "Pool already settled");
        if (!pool.allowMultipleTickets) {
            require(pool.entries[msg.sender] == 0, "Already entered pool");
        }
        require(pool.size + msg.value <= pool.maxPoolSize, "Pool is full");

        if (pool.entries[msg.sender] == 0) {
            pool.participants.push(msg.sender);
        }

        pool.entries[msg.sender] += 1;
        pool.size += msg.value;
        pool.totalTickets++;

        emit EnteredPool(poolId, msg.sender, pool.entries[msg.sender]);
    }

    function settlePool(uint poolId, address bankAddress, address winnerAddress) external {
        Pool storage pool = pools[poolId];
        require(msg.sender == owner, "Only owner can settle pools");
        require(pool.size == pool.maxPoolSize, "Pool is not full yet");
        require(!pool.settled, "Pool already settled");
        require(pool.participants.length > 0, "No participants in the pool");

        // Verify if the given winnerAddress is a valid participant
        bool isValidWinner = false;
        for (uint i = 0; i < pool.participants.length; i++) {
            if (pool.participants[i] == winnerAddress) {
                isValidWinner = true;
                break;
            }
        }
        require(isValidWinner, "Provided winner address is not a participant in the pool");

        // Calculate the fee and winner amount
        uint feeAmount = (pool.size * feePercent) / 100;
        uint prizeAmount = pool.size - feeAmount;

        // Transfer fee to bank
        payable(bankAddress).transfer(feeAmount);

        // Transfer prize to winner
        payable(winnerAddress).transfer(prizeAmount);

        // Mark pool as settled
        pool.settled = true;

        emit PoolSettled(poolId, winnerAddress, prizeAmount, feeAmount);
    }
}
