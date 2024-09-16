/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('pools', function(table) {
    table.string('eth_address').nullable();    // Add eth_address field
    table.float('prize_amount').nullable();    // Add prize_amount field
    table.float('entry_amount').nullable();    // Add entry_amount field
    table.timestamps(true, true);              // Add createdAt and updatedAt fields
  });
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('pools', function(table) {
    table.dropColumn('eth_address');           // Remove eth_address field
    table.dropColumn('prize_amount');          // Remove prize_amount field
    table.dropColumn('entry_amount');          // Remove entry_amount field
    table.dropTimestamps();
  });
};
