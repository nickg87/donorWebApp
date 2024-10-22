/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('articles', function (table) {
    table.increments('id').primary(); // Auto-incrementing primary key

    // JSONB fields for multi-language content (English and Spanish)
    table.jsonb('title').notNullable(); // { en: 'English title', es: 'Spanish title' }
    table.jsonb('short').notNullable(); // { en: 'English short description', es: 'Spanish short description' }
    table.jsonb('description').notNullable(); // { en: 'English description', es: 'Spanish description' }

    // JSONB meta field for custom SEO-related metadata for each language
    table.jsonb('meta'); // { en: { title: '', description: '' }, es: { title: '', description: '' } }

    // Other fields
    table.boolean('active').defaultTo(true); // Whether the article is active or inactive
    table.string('featured_image'); // Path or ID to the featured image (you can decide the actual format later)
    //table.integer('author_id').unsigned().references('id').inTable('authors').onDelete('SET NULL'); // Foreign key to the authors table
    table.integer('author_id').unsigned().nullable();
    table.integer('views').defaultTo(0); // View counter, starts at 0

    // Timestamps
    table.timestamps(true, true); // created_at and updated_at timestamps

    // Indexes for optimization
    table.index('active'); // Index the active field for frequent queries
    table.index(knex.raw("(title->>'en')"), 'idx_articles_title_en'); // Index the English title for faster queries
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('articles');
};
