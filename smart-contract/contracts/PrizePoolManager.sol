// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PrizePoolManager {
    struct Pool {
        uint size; // Current pool size in wei
        uint ticketPrice; // Cost of a ticket in wei
        uint maxPoolSize; // Maximum size of the pool in wei
        uint totalTickets; // Total tickets purchased for this pool
        bool settled; // Keeps track if the pool is settled
    }

    mapping(uint => Pool) public pools;
    address public owner;
    uint public feePercent = 10; // 10% fee

    constructor() {
        owner = msg.sender; // Set contract deployer as owner
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    modifier validAddress(address _addr) {
        require(_addr != address(0), "Address must be valid");
        _;
    }

    // Accepting poolId as a parameter
    function createPool(uint poolId, uint ticketPrice, uint maxPoolSize) external onlyOwner {
        // Check if poolId already exists
        require(pools[poolId].ticketPrice == 0, "Pool ID already exists");

        pools[poolId] = Pool({
            size: 0,
            ticketPrice: ticketPrice,
            maxPoolSize: maxPoolSize,
            totalTickets: 0,
            settled: false
        });
    }

    function enterPool(uint poolId) external payable {
        Pool storage pool = pools[poolId];
        require(msg.value == pool.ticketPrice, "Incorrect ticket price");
        require(!pool.settled, "Pool already settled");
        require(pool.size + msg.value <= pool.maxPoolSize, "Pool is full");

        // Increase the pool size and total tickets
        pool.size += msg.value;
        pool.totalTickets++;
    }

    function settlePool(uint poolId, address bankAddress, address winnerAddress) external onlyOwner validAddress(bankAddress) validAddress(winnerAddress) {
        Pool storage pool = pools[poolId];
        require(pool.size == pool.maxPoolSize, "Pool is not full yet");
        require(!pool.settled, "Pool already settled");

        uint feeAmount = (pool.size * feePercent) / 100;
        uint prizeAmount = pool.size - feeAmount;

        // Mark pool as settled before making external calls to prevent reentrancy attacks
        pool.settled = true;

        // Use call for sending ether to avoid gas limit issues
        (bool bankSuccess, ) = bankAddress.call{value: feeAmount}("");
        require(bankSuccess, "Failed to send fee to bank");

        (bool winnerSuccess, ) = winnerAddress.call{value: prizeAmount}("");
        require(winnerSuccess, "Failed to send prize to winner");
    }

    function changeOwner(address newOwner) external onlyOwner validAddress(newOwner) {
        owner = newOwner;
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
