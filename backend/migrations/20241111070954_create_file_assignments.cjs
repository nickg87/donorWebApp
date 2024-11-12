// migrations/xxxx_create_file_assignments.js
exports.up = async function(knex) {
  await knex.schema.createTable('file_assignments', (table) => {
    table.increments('id').primary();
    table.integer('file_id').unsigned().notNullable()
      .references('id').inTable('files')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.integer('target_id').unsigned().notNullable(); // ID of the related model (e.g., article or pool)
    table.string('target_type').notNullable(); // Type of model ('Article' or 'Pool')
    table.timestamps(true, true); // created_at and updated_at
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('file_assignments');
};