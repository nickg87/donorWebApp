import express from 'express';

const router = express.Router();

export default (db) => {
  router.get('/', async (req, res) => {
    try {
      const transactions = await db('transactions').select('*');
      res.json(transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).json({ error: 'Failed to fetch transactions' });
    }
  });

  // New route: Get transaction count for a pool by ID
  router.get('/count/:poolId', async (req, res) => {
    try {
      const { poolId } = req.params;

      // Query the transactions table to count the number of transactions for the given poolId
      const transactionCount = await db('transactions').count('* as count').where({ poolId });
      const count = transactionCount[0].count;

      res.json({ count });
    } catch (error) {
      console.error('Error fetching transaction count:', error);
      res.status(500).json({ error: 'Failed to fetch transaction count' });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const { blockHash, from, to, value, gas, poolId } = req.body;
      await db('transactions').insert({ blockHash, from, to, value, gas, poolId });
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
      await db('transactions').where({ id }).update({ address, amount, fee, poolId });
      res.json({ success: true });
    } catch (error) {
      console.error('Error updating donor:', error);
      res.status(500).json({ error: 'Failed to update donor' });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await db('transactions').where({ id }).del();
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting donor:', error);
      res.status(500).json({ error: 'Failed to delete donor' });
    }
  });

  return router;
};
