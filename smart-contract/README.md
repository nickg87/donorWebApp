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


Compile SMART CONTRACT before deploying (if is not seeing any changes remove cache: "rm -rf artifacts cache")
```shell
npx hardhat compile
```
Not seeing changes? run this:
```shell
rm -rf artifacts cache
```

Run local node hardhat
```shell
 npx hardhat node  
```

Run test locally via script folder files
```shell
node scripts/createLocalPool.js
node scripts/enterLocalPool.js
node scripts/getLocalPool.js
////
node scripts/createPool.js
node scripts/enterPool.js
////
node scripts/createPoolMainnet.js
node scripts/enterPoolMainnet.js
node scripts/settlePoolMainnet.js
```

Deploy SMART CONTRACT to localhost Testnet
```shell
npx hardhat run scripts/deploy.js --network localhost
```

Deploy SMART CONTRACT to Sepolia Testnet 
```shell
npx hardhat run scripts/deploy.js --network sepolia
```
Deploy SMART CONTRACT to Mainnet (production/live network)
```shell
npx hardhat run scripts/deploy.js --network mainnet
```
For this it needs 
```shell
INFURA_API_KEY='here-the-infura-api-key'
PRIVATE_KEY='here-the-private-key-of-the-wallet-address-you-will-use-for-the-smart-contract'
```
