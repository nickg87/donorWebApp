export default (sequelize, DataTypes) => {
  const FileAssignment = sequelize.define('FileAssignment', {
    file_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'files',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    target_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    target_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'file_assignments',
    timestamps: false,
  });

  return FileAssignment;
};
