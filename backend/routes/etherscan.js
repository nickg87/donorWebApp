import express from 'express';
import { ethers } from 'ethers';
import axios from 'axios';
import knex from 'knex';
import knexConfig from '../knexfile.mjs';
import { fetchEtherScanData } from '../utils/etherscanService.js';


const router = express.Router();

router.get('/fetch-data/:address', async (req, res) => {
  const { address } = req.params;
  const etherScanApiKey = process.env.ETHERSCAN_APIKEY;

  const db = knex(knexConfig.development);

  if (!etherScanApiKey) {
    return res.status(500).json({ error: 'Etherscan API key is not set' });
  }

  try {
    const result = await fetchEtherScanData(address, db);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
