
exports.up = function(knex) {
  return knex.schema.table('users', (table) => {
    table.boolean('is_subscribed').defaultTo(false).notNullable(); // Add column with default value
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', (table) => {
    table.dropColumn('is_subscribed'); // Remove column on rollback
  });
};
