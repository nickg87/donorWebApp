/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .hasTable('transactions') // Check if the transactions table exists
    .then(function(exists) {
      if (!exists) {
        // If transactions table doesn't exist, rename donors to transactions
        return knex.schema.renameTable('donors', 'transactions');
      }
      // If transactions table exists, you might want to handle it differently,
      // e.g., drop the table or simply skip renaming.
      // You could add a custom message or log if you want to log this.
      console.log("The transactions table already exists. Skipping renaming.");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.renameTable('transactions', 'donors');
};
