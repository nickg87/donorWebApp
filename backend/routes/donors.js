const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', async (req, res) => {
    try {
      const donors = await db('donors').select('*');
      res.json(donors);
    } catch (error) {
      console.error('Error fetching donors:', error);
      res.status(500).json({ error: 'Failed to fetch donors' });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const { blockHash, from, to, value, gas, poolId } = req.body;
      await db('donors').insert({ blockHash, from, to, value, gas, poolId });
      res.status(201).json({ success: true });
    } catch (error) {
      console.error('Error creating donor:', error);
      res.status(500).json({ error: 'Failed to create donor' });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { address, amount, fee, poolId } = req.body;
      await db('donors').where({ id }).update({ address, amount, fee, poolId });
      res.json({ success: true });
    } catch (error) {
      console.error('Error updating donor:', error);
      res.status(500).json({ error: 'Failed to update donor' });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await db('donors').where({ id }).del();
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting donor:', error);
      res.status(500).json({ error: 'Failed to delete donor' });
    }
  });

  return router;
};
