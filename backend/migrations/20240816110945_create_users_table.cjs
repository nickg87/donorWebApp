/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .hasTable('users') // Check if the users table exists
    .then(function(exists) {
      if (!exists) {
        return knex.schema.createTable('users', function(table) {
          table.increments('id').primary(); // Auto-incrementing primary key
          table.string('name'); // User's name
          table.string('email').notNullable().unique(); // User's email, must be unique
          table.string('password_hash').notNullable(); // Hashed password
          table.string('image'); // URL to user's profile image
          table.boolean('email_verified').defaultTo(false); // Whether the user's email is verified
          table.boolean('is_admin').defaultTo(false); // Whether the user is of admin type
          //table.uuid('session_id').unique(); // Session ID for tracking user's current session, must be unique
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
  return knex.schema.dropTableIfExists('users');
};
