/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.table('pools', (table) => {
    table.enum('drawn_status', ['inactive', 'pending', 'in_progress', 'completed'])
      .notNullable()
      .defaultTo('inactive');
    table.jsonb('drawn_data').nullable();
    table.timestamp('drawn_at').nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.table('pools', (table) => {
    table.dropColumn('drawn_status');
    table.dropColumn('drawn_data');
    table.dropColumn('drawn_at');
  });
};
