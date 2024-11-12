exports.up = async function(knex) {
  // Dynamically import generateSlug function
  const { generateSlug } = await import("../utils/miscellaneous.js");

  await knex.schema.table('articles', (table) => {
    table.string('slug').unique();
  });

  const articles = await knex('articles').select('id', 'title');

  for (const article of articles) {
    const slug = generateSlug(article.title?.en);
    await knex('articles')
      .where({ id: article.id })
      .update({ slug });
  }

  await knex.schema.alterTable('articles', (table) => {
    table.string('slug').notNullable().alter();
  });
};

exports.down = function(knex) {
  return knex.schema.table('articles', (table) => {
    table.dropColumn('slug');
  });
};
