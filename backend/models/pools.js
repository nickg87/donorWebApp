// models/pools.js
export default (sequelize, DataTypes) => {
  const Pool = sequelize.define('Pool', {
    title: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    description: {
      type: DataTypes.JSONB,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    type: {
      type: DataTypes.STRING,
    },
    is_test_net: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    eth_address: {
      type: DataTypes.STRING,
    },
    prize_amount: {
      type: DataTypes.FLOAT,
    },
    entry_amount: {
      type: DataTypes.FLOAT,
    },
    drawn_status: {
      type: DataTypes.STRING,
    },
    drawn_data: {
      type: DataTypes.JSONB,
    },
    drawn_at: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'pools',
    timestamps: true,
    underscored: true,
  });

  // Define associations here
  Pool.associate = (models) => {
    Pool.hasMany(models.Transaction, {
      foreignKey: 'poolId', // Foreign key in Transaction model
      as: 'transactions', // Alias for the association
    });
    // Pool.belongsToMany(models.File, {
    //   through: {
    //     model: models.FileAssignment,
    //     unique: false,
    //     scope: { target_type: 'pool' },
    //   },
    //   foreignKey: 'target_id',
    //   otherKey: 'file_id',
    //   as: 'files',
    // });
  };

  return Pool;
};
