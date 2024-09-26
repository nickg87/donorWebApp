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
    eth_address: {
      type: DataTypes.STRING,
    },
    prize_amount: {
      type: DataTypes.FLOAT,
    },
    entry_amount: {
      type: DataTypes.FLOAT,
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
  };

  return Pool;
};
