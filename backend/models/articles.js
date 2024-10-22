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
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    featured_image: {
      type: DataTypes.STRING,
    },
    // author_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true, // Nullable since you may not have authors yet
    //   references: {
    //     model: 'authors', // References the authors table when created
    //     key: 'id',
    //     onDelete: 'SET NULL',
    //   },
    // },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    tableName: 'articles',
    timestamps: true,
    underscored: true,
  });

  // Define associations here
  // Article.associate = (models) => {
  //   Article.belongsTo(models.Author, { // Assuming you will have an Author model
  //     foreignKey: 'author_id',
  //     as: 'author',
  //   });
  // };

  return Article;
};
