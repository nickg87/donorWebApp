
exports.up = function(knex) {
  return knex.schema.table('pools', (table) => {
    table.boolean('is_test_net').defaultTo(false).notNullable(); // Add column with default value
  });
};

exports.down = function(knex) {
  return knex.schema.table('pools', (table) => {
    table.dropColumn('is_test_net'); // Remove column on rollback
  });
};
