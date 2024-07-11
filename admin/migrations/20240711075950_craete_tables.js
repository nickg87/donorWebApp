/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('pools', function(table) {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.string('description');
      table.boolean('active').defaultTo(true);
      table.string('type');
      // Add other columns as needed
    })
    .createTable('donors', function(table) {
      table.increments('id').primary();
      table.string('address').notNullable();
      table.float('amount').notNullable();
      table.float('fee').notNullable();
      table.dateTime('createdAt').defaultTo(knex.fn.now());
      table.integer('poolId').unsigned().references('pools.id').onDelete('CASCADE');
      // Add other columns as needed
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('donors')
    .dropTableIfExists('pools');
};
