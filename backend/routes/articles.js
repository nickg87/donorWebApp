import express from 'express';
const router = express.Router();

export default (db) => {
  // Get all articles
  // router.get('/', async (req, res) => {
  //   try {
  //     const articles = await db('articles').select('*');
  //     res.json(articles);
  //   } catch (error) {
  //     console.error('Error fetching articles:', error);
  //     res.status(500).json({ error: 'Failed to fetch articles' });
  //   }
  // });

  // Get all articles with associated files (images)
  router.get('/', async (req, res) => {
    try {
      // Fetch articles with files joined through file_assignments
      const articlesWithFiles = await db('articles')
        .leftJoin('file_assignments', function () {
          this.on('articles.id', '=', 'file_assignments.target_id')
            .andOn('file_assignments.target_type', '=', db.raw('?', ['article']));
        })
        .leftJoin('files', 'file_assignments.file_id', 'files.id')
        .select(
          'articles.*',
          'files.id as file_id',
          'files.filename',
          'files.path'
        ).orderBy('articles.id', 'desc');

      // Group the articles and their associated files
      const articles = articlesWithFiles.reduce((acc, row) => {
        // Find or create an article entry
        let article = acc.find(a => a.id === row.id);
        if (!article) {
          article = {
            id: row.id,
            title: row.title,
            description: row.description,
            short: row.short,
            slug: row.slug,
            active: row.active,
            type: row.type,
            created_at: row.created_at,
            files: [],
          };
          acc.push(article);
        }

        // If the row has an associated file, add it to the article's files array
        if (row.file_id) {
          article.files.push({
            id: row.file_id,
            filename: row.filename,
            path: row.path,
          });
        }

        return acc;
      }, []);

      res.json(articles);
    } catch (error) {
      console.error('Error fetching articles with files:', error);
      res.status(500).json({ error: 'Failed to fetch articles with files' });
    }
  });


  //Get article by slug
  router.get('/:slug', async (req, res) => {
    const { slug } = req.params;

    try {
      // Retrieve the full article data
      const article = await db('articles')
        .leftJoin('file_assignments', function () {
          this.on('articles.id', '=', 'file_assignments.target_id')
            .andOn('file_assignments.target_type', '=', db.raw('?', ['article']));
        })
        .leftJoin('files', 'file_assignments.file_id', 'files.id')
        .select(
          'articles.*',  // Select entire article row including JSON fields
          'files.id as file_id',
          'files.filename',
          'files.path'
        )
        .where({ 'articles.slug': slug })
        .first();

      if (!article) {
        return res.status(404).json({ error: 'Article not found' });
      }

      // Format files as an array for consistency
      const files = article.file_id
        ? [{ id: article.file_id, filename: article.filename, path: article.path }]
        : [];

      // Structure the article data
      const articleData = {
        ...article,
        files,
      };

      res.json(articleData);
    } catch (error) {
      console.error('Error fetching article:', error);
      res.status(500).json({ error: 'Failed to fetch article' });
    }
  });



  // Get the current pool based on specified conditions
  router.get('/current-article', async (req, res) => {
    try {
      const currentPool = await db('articles')
        .select('*')
        .where({ active: true, type: 'normal', drawn_status: 'inactive' })
        .orderBy('created_at', 'desc') // Adjust if you have a different field for sorting
        .first(); // Get the first result, which will be the latest one

      if (!currentPool) {
        return res.status(404).json({ error: 'No active pool found' });
      }

      res.json(currentPool);
    } catch (error) {
      console.error('Error fetching current pool:', error);
      res.status(500).json({ error: 'Failed to fetch current pool' });
    }
  });



  return router;
};
