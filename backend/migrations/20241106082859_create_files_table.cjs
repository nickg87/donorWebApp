exports.up = function(knex) {
  return knex.schema.createTable('files', (table) => {
    table.increments('id').primary();
    table.string('filename').notNullable();   // Original file name
    table.string('path').notNullable();       // File path in the assets folder
    table.timestamp('uploadedAt').defaultTo(knex.fn.now()); // Upload timestamp
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('files');
};