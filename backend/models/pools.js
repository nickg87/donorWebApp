// models/pools.js
export default (sequelize, DataTypes) => {
  return sequelize.define('Pool', {
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
    tableName: 'pools',      // Explicitly set the table name
    timestamps: true,        // Enable timestamps
    underscored: true,       // Use snake_case for timestamps and other column names
  });
};
