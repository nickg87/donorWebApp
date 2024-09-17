import express from 'express';
const router = express.Router();

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

  return router;
};
