// models/transactions.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Transaction', {
    blockHash: {
      type: DataTypes.STRING,
    },
    blockNumber: {
      type: DataTypes.INTEGER,
    },
    from: {
      type: DataTypes.STRING,
    },
    gas: {
      type: DataTypes.INTEGER,
    },
    gasPrice: {
      type: DataTypes.STRING,
    },
    gasUsed: {
      type: DataTypes.INTEGER,
    },
    hash: {
      type: DataTypes.STRING,
    },
    timeStamp: {
      type: DataTypes.STRING,
    },
    to: {
      type: DataTypes.STRING,
    },
    txreceipt_status: {
      type: DataTypes.INTEGER,
    },
    value: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    poolId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'pools',
        key: 'id',
      },
    },
  }, {
    tableName: 'transactions',      // Explicitly set the table name
    timestamps: false,             // Disable Sequelize’s automatic timestamps
  });
};
