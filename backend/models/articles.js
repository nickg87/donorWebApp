// models/articles.js
export default (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    short: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    description: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    meta: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    featured_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    tableName: 'articles',
    timestamps: true,
    underscored: true,
  });

  // Define association with File through FileAssignment
  Article.associate = (models) => {
    Article.belongsToMany(models.File, {
      through: {
        model: models.FileAssignment,
        unique: false,
        scope: { target_type: 'article' },
      },
      foreignKey: 'target_id',
      otherKey: 'file_id',
      as: 'files',
    });
  };

  return Article;
};
