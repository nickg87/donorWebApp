# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```

Deploy SMART CONTRACT to localhost Testnet
```shell
npx hardhat run scripts/deploy.js --network localhost
```

Deploy SMART CONTRACT to Sepolia Testnet 
```shell
npx hardhat run scripts/deploy.js --network sepolia
```
For this it needs 
```shell
INFURA_API_KEY='here-the-infura-api-key'
PRIVATE_KEY='here-the-private-key-of-the-wallet-address-you-will-use-for-the-smart-contract'
```
