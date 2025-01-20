/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('email_subscriptions', function(table) {
    table.increments('id').primary(); // Auto-incrementing primary key
    table.string('email').notNullable().unique(); // User's email
    table.string('temp_hash').notNullable().unique(); // Temporary hash for email verification
    table.timestamps(true, true); // created_at and updated_at timestamps
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('email_subscriptions');
};
