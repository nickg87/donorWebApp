/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .hasTable('accounts') // Check if the accounts table exists
    .then(function(exists) {
      if (!exists) {
        return knex.schema.createTable('accounts', function(table) {
          table.increments('id').primary(); // Auto-incrementing primary key
          table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
          table.string('provider').notNullable(); // OAuth provider, e.g., 'google', 'facebook'
          table.string('provider_account_id').notNullable(); // The unique ID provided by the OAuth provider
          table.string('refresh_token'); // OAuth refresh token, if applicable
          table.string('access_token'); // OAuth access token
          table.timestamp('access_token_expires'); // Expiration time of the access token
          table.timestamps(true, true); // created_at and updated_at timestamps
        });
      }
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('accounts');
};
