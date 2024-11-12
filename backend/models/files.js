// models/files.js
export default (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    filename: {
      type: DataTypes.STRING,
      allowNull: false,  // Make the filename required
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,  // Make the file path required
    },
    uploadedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,  // Automatically set the upload timestamp
    },
  }, {
    tableName: 'files',
    timestamps: false,  // No `updatedAt`, only `createdAt` via `uploadedAt`
  });

  // Define associations with Article and Pool through FileAssignment
  File.associate = (models) => {
    File.belongsToMany(models.Article, {
      through: {
        model: models.FileAssignment,
        unique: false,
        scope: { target_type: 'article' },
      },
      foreignKey: 'file_id',
      otherKey: 'target_id',
      as: 'articles',
    });
    // File.belongsToMany(models.Pool, {
    //   through: {
    //     model: models.FileAssignment,
    //     unique: false,
    //     scope: { target_type: 'pool' },
    //   },
    //   foreignKey: 'file_id',
    //   otherKey: 'target_id',
    //   as: 'pools',
    // });
  };

  return File;
};
