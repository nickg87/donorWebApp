/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .hasTable('pools') // Check if the pools table exists
    .then(function(exists) {
      if (!exists) {
        return knex.schema.createTable('pools', function(table) {
          table.increments('id').primary();
          table.string('title').notNullable();
          table.string('description');
          table.boolean('active').defaultTo(true);
          table.string('type');
          // Add other columns as needed
        });
      }
    })
    .then(() => {
      return knex.schema.hasTable('donors'); // Check if the donors table exists
    })
    .then(function(exists) {
      if (!exists) {
        return knex.schema.createTable('donors', function(table) {
          table.increments('id').primary();
          table.string('blockHash'); // The hash of the block where this transaction was included.
          table.integer('blockNumber'); // The block number where this transaction was included.
          table.string('from'); // The Ethereum address of the sender.
          table.integer('gas'); // The gas limit provided by the sender for this transaction.
          table.string('gasPrice'); // The price of gas in wei paid by the sender.
          table.integer('gasUsed'); // The amount of gas used by this transaction.
          table.string('hash'); // The transaction hash.
          table.string('timeStamp'); // The timestamp of the transaction in Unix epoch time.
          table.string('to'); // The Ethereum address of the receiver.
          table.integer('txreceipt_status'); // The status of the transaction receipt.
          table.string('value'); // The value transferred in wei.
          table.dateTime('createdAt').defaultTo(knex.fn.now());
          table.integer('poolId').unsigned().references('pools.id').onDelete('CASCADE');
          // Add other columns as needed
        });
      }
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('donors')
    .dropTableIfExists('pools');
};
