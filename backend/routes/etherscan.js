const express = require('express');
const { ethers } = require('ethers');
const axios = require('axios');
const knex = require("knex");
const knexConfig = require("../knexfile");
const router = express.Router();
const fetchEtherScanData = require('../utils/etherscanService');

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

module.exports = router;
