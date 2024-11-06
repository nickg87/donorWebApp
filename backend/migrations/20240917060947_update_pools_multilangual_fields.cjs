/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.exports = {
  up: function(knex) {
    return knex.schema.table('pools', function(table) {
      table.jsonb('title').alter(); // Change title column to jsonb
      table.jsonb('description').alter(); // Change description column to jsonb
    });
  },

  down: function(knex) {
    return knex.schema.table('pools', function(table) {
      table.string('title').alter(); // Revert title column to string
      table.string('description').alter(); // Revert description column to string
    });
  }
};
