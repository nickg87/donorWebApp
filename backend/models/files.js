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

  return File;
};
