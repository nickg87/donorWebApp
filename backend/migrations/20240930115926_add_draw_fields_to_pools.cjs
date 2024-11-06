/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  // Check and add 'drawn_status' column if it does not exist
  const hasDrawnStatus = await knex.schema.hasColumn('pools', 'drawn_status');
  if (!hasDrawnStatus) {
    await knex.schema.table('pools', (table) => {
      table.enum('drawn_status', ['inactive', 'pending', 'in_progress', 'completed'])
        .notNullable()
        .defaultTo('inactive');
    });
  }

  // Check and add 'drawn_data' column if it does not exist
  const hasDrawnData = await knex.schema.hasColumn('pools', 'drawn_data');
  if (!hasDrawnData) {
    await knex.schema.table('pools', (table) => {
      table.jsonb('drawn_data').nullable();
    });
  }

  // Check and add 'drawn_at' column if it does not exist
  const hasDrawnAt = await knex.schema.hasColumn('pools', 'drawn_at');
  if (!hasDrawnAt) {
    await knex.schema.table('pools', (table) => {
      table.timestamp('drawn_at').nullable();
    });
  }
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
