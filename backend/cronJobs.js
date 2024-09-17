import cron from 'node-cron';
import knex from 'knex';
import knexConfig from './knexfile.mjs'; // Adjust path to knexfile
import { fetchEtherScanData } from './utils/etherscanService.js';


// Initialize database connection
const db = knex(knexConfig.development);

// Address to monitor
const address = '0x092Aa7B28Ee01F85Ffc0B3ae941FE1926F8fA3d3'; // Replace with the address you want to monitor

// Schedule a cron job to run every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  console.log('Running Etherscan fetch job...');
  try {
    const result = await fetchEtherScanData(address, db);
    console.log('CRON: Etherscan data fetched and stored:', result);
  } catch (error) {
    console.error('CRON: Error running the Etherscan fetch job:', error);
  }
});

// Export a function to start cron jobs if needed
export const startCronJobs = () => {
  console.log('Starting cron jobs...');
  // Cron jobs are already scheduled, so this can be used to start other cron jobs if necessary
};
