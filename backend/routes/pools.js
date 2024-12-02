import express from 'express';
const router = express.Router();

// Helper function to validate Ethereum addresses
const isValidEthAddress = (address) => /^0x[a-fA-F0-9]{40}$/.test(address);


export default (db) => {
  // Get all pools
  router.get('/', async (req, res) => {
    try {
      const pools = await db('pools').select('*');
      res.json(pools);
    } catch (error) {
      console.error('Error fetching pools:', error);
      res.status(500).json({ error: 'Failed to fetch pools' });
    }
  });

  // Get pool by eth_address
  // router.get('/:eth_address', async (req, res) => {
  //   try {
  //     const { eth_address } = req.params;
  //
  //
  //     // Fetch pools from the database
  //     const pools = await db('pools').select('*').where({ eth_address });
  //
  //     // Handle case where no pools are found
  //     if (pools.length === 0) {
  //       return res.status(404).json({ error: 'No pools found for the provided eth_address' });
  //     }
  //
  //     // Respond with the pool(s)
  //     res.json(pools);
  //   } catch (error) {
  //     console.error('Error fetching pools:', error);
  //     res.status(500).json({ error: 'Failed to fetch pools' });
  //   }
  // });

  // Create a new pool
  router.post('/', async (req, res) => {
    try {
      const { title, description, active = true, type } = req.body;
      const [ret] = await db('pools').insert({ title, description, active, type }).returning('id');
      res.status(201).json({ success: true, id: ret.id });
    } catch (error) {
      console.error('Error creating pool:', error);
      res.status(500).json({ error: 'Failed to create pool' });
    }
  });

  // Update a pool by ID
  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, active, type } = req.body;
      await db('pools').where({ id }).update({ title, description, active, type });
      res.json({ success: true });
    } catch (error) {
      console.error('Error updating pool:', error);
      res.status(500).json({ error: 'Failed to update pool' });
    }
  });

  // Delete a pool by ID
  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await db('pools').where({ id }).del();
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting pool:', error);
      res.status(500).json({ error: 'Failed to delete pool' });
    }
  });


  //Get pool by id with transactions
  router.get('/getById/:id', async (req, res) => {
    const { id } = req.params;

    try {
      // Fetch the pool details
      const pool = await db('pools')
        .select('*')
        .where('id', id)
        .first();

      if (!pool) {
        return res.status(404).json({ error: 'Pool not found' });
      }

      // Fetch the associated transactions
      const transactions = await db('transactions')
        .select('*')
        .where('poolId', id)
        .orderBy('timeStamp', 'desc');  // Optionally order transactions by timestamp

      // Attach transactions to the pool object
      const poolWithTransactions = {
        ...pool,
        transactions,
      };

      res.json(poolWithTransactions);
    } catch (error) {
      console.error('Error fetching pool:', error);
      res.status(500).json({ error: 'Failed to fetch pool' });
    }
  });

  // Get the current pool based on specified conditions
  router.get('/current-pool', async (req, res) => {
    try {
      const isSpecial = req.query?.isSpecial === 'true';
      // Determine the type based on `isSpecial`
      const poolType = isSpecial ? 'million' : 'normal';
      const currentPool = await db('pools')
        .select('*')
        .where({ active: true, type: poolType, drawn_status: 'inactive' })
        .orderBy('created_at', 'desc') // Adjust if you have a different field for sorting
        .first(); // Get the first result, which will be the latest one

      if (!currentPool) {
        return res.status(404).json({ error: 'No active pool found' });
      }

      res.json(currentPool);
    } catch (error) {
      console.error('Error fetching current pool:', error);
      res.status(500).json({ error: 'Failed to fetch current pool' });
    }
  });



  return router;
};
