import cron from 'node-cron';
import knex from 'knex';
import knexConfig from './knexfile.mjs'; // Adjust path to knexfile
import { fetchEtherScanData } from './utils/etherscanService.js';

// Initialize database connection
const db = knex(knexConfig.development);
const etherScanApiKey = process.env.ETHERSCAN_APIKEY;
// Get the address from command-line arguments or use a default
//const address = process.argv[2] || '0x092Aa7B28Ee01F85Ffc0B3ae941FE1926F8fA3d3'; // Replace with a default address if none provided
const address = process.argv[2] || '0x0f63cc1031d656921c3D4D13dDe38eCb10e9F759'; // Replace with a default address if none provided

// Validate address
if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
  console.error('Please provide a valid Ethereum address.');
  process.exit(1);
}

// Function to fetch Etherscan data
const runEtherscanFetchJob = async () => {
  console.log(`Running Etherscan fetch job for address: ${address}...`);
  try {
    const result = await fetchEtherScanData(address, db, etherScanApiKey);
    console.log('CRON: Etherscan data fetched and stored:', result);
  } catch (error) {
    console.error('CRON: Error running the Etherscan fetch job:', error);
  }
};

// Schedule a cron job to run every 2 minutes
cron.schedule('*/2 * * * *', runEtherscanFetchJob);

// Export a function to manually trigger the job
export const triggerEtherscanFetchJob = async () => {
  await runEtherscanFetchJob();
};

// Execute the fetch job immediately if an address is provided via CLI
if (process.argv[2]) {
  await triggerEtherscanFetchJob();
}

// Export a function to start cron jobs if needed
export const startCronJobs = () => {
  console.log('Starting cron jobs...');
  // Cron jobs are already scheduled, so this can be used to start other cron jobs if necessary
};
