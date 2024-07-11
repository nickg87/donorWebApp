exports.seed = function(knex) {
  return knex.transaction(async function(trx) {
    try {
      // Seed pools table first
      await trx('pools').del(); // Clear existing data if any
      await trx('pools').insert([
        { title: 'Pool 1', description: 'Description for Pool 1', active: true, type: 'Type A' },
        { title: 'Pool 2', description: 'Description for Pool 2', active: true, type: 'Type B' },
        { title: 'Pool 3', description: 'Description for Pool 3', active: false, type: 'Type C' }
      ]);

      // Get pool IDs for reference in donors seeding
      const pools = await trx('pools').select('id');

      // Seed donors table with valid poolId references
      await trx('donors').del(); // Clear existing data if any
      await trx('donors').insert([
        { address: '0x1a5b11f1c8ba1b20adba3b0e22de', amount: 100.00, fee: 5.00, poolId: pools[0].id },
        { address: '0x2cbbef50c0c9c94a9bfb84e88f6f', amount: 75.50, fee: 3.25, poolId: pools[0].id },
        { address: '0x3d78a3d94b739e6a38d017a5c3e3', amount: 200.00, fee: 8.00, poolId: pools[1].id }
      ]);

      // Commit the transaction
      await trx.commit();
      console.log('Seeding completed successfully.');
    } catch (error) {
      // Rollback transaction if there's an error
      await trx.rollback();
      throw error;
    }
  });
};
