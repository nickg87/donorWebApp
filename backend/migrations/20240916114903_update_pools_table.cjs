/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('pools', function(table) {
    // Check if the column exists before adding it
    knex.schema.hasColumn('pools', 'eth_address').then(function(exists) {
      if (!exists) {
        table.string('eth_address').nullable();    // Add eth_address field
      }
    });

    knex.schema.hasColumn('pools', 'prize_amount').then(function(exists) {
      if (!exists) {
        table.float('prize_amount').nullable();    // Add prize_amount field
      }
    });

    knex.schema.hasColumn('pools', 'entry_amount').then(function(exists) {
      if (!exists) {
        table.float('entry_amount').nullable();    // Add entry_amount field
      }
    });

    knex.schema.hasColumn('pools', 'created_at').then(function(exists) {
      if (!exists) {
        table.timestamps(true, true); // Add created_at and updated_at fields
      }
    });
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
    table.dropTimestamps();                    // Remove created_at and updated_at fields
  });
};
