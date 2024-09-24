//adminJsSetup.mjs
import {fileURLToPath} from 'url';
import path from 'path';
import AdminJS, {ComponentLoader} from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import {Database, Resource} from '@adminjs/sequelize';
import {Sequelize} from 'sequelize';
// Import model and initialize AdminJS with the models
import poolModel from './models/pools.js';
import transactionModel from './models/transactions.js';

// Register AdminJS adapter
AdminJS.registerAdapter({ Database, Resource });


// Set up the database connection with Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

// Initialize models
const Pool = poolModel(sequelize, Sequelize.DataTypes);
const Transaction = transactionModel(sequelize, Sequelize.DataTypes);

// Determine the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to fetch all pools
const getAllPools = async () => {
  return await Pool.findAll(); // Fetch pools from your database
};

export async function setupAdminJS() {
  const pools = await getAllPools(); // Fetch the pools data

  // Create and configure ComponentLoader
//   const componentLoader = new ComponentLoader();
// //componentLoader.add('TranslatedFieldsTabs', path.join(__dirname, './components/TranslatedFieldsTabs.jsx')); // Use correct path
//   componentLoader.add('TranslatedFieldsTabs', './components/TranslatedFieldsTabs');
//   console.log(componentLoader);

  const componentLoader = new ComponentLoader();

  const Components = {
    //TranslatedFieldsTabs: componentLoader.add('TranslatedFieldsTabs', './components/TranslatedFieldsTabs'),
    TitleEdit: componentLoader.add('TitleEdit', './components/MultiLingual/TitleEdit'),
    TitleShow: componentLoader.add('TitleShow', './components/MultiLingual/TitleShow'),
    TitleList: componentLoader.add('TitleList', './components/MultiLingual/TitleList'),
    DescriptionEdit: componentLoader.add('DescriptionEdit', './components/MultiLingual/DescriptionEdit'),
    DescriptionShow: componentLoader.add('DescriptionShow', './components/MultiLingual/DescriptionShow'),
    DescriptionList: componentLoader.add('DescriptionList', './components/MultiLingual/DescriptionList'),
    PoolSelectEdit: componentLoader.add('PoolSelectEdit', './components/PoolSelectEdit'),
    PoolSelectShow: componentLoader.add('PoolSelectShow', './components/PoolSelectShow'),
    // other custom components
  }



  // Initialize AdminJS
  const adminJS = new AdminJS({
    resources: [
      {
        resource: Pool,
        options: {
          properties: {
            title: {
              type: 'string',
              components: {
                edit: Components.TitleEdit,
                show: Components.TitleShow,
                list: Components.TitleList,
              },
            },
            description: {
              type: 'richtext',
              components: {
                edit: Components.DescriptionEdit,
                show: Components.DescriptionShow,
                list: Components.DescriptionList,
              },
            },
            type: {
              type: 'select',
              availableValues: [
                { value: 'normal', label: 'Normal' },
                { value: 'social', label: 'Social' },
                { value: 'million', label: 'Million' },
              ],
            },
          },
          navigation: { name: 'Resources' },
        },
      },
      {
        resource: Transaction,
        options: {
          listProperties: ['id', 'blockHash', 'blockNumber', 'from', 'gas', 'gasPrice', 'gasUsed', 'hash', 'timeStamp', 'to', 'txreceipt_status', 'value', 'createdAt', 'poolId'],
          filterProperties: ['id', 'from', 'to', 'poolId'],
          sort: { direction: 'desc', sortBy: 'id' },
          navigation: { name: 'Resources' },
          properties: {
            poolId: {
              components: {
                edit: Components.PoolSelectEdit,
                show: Components.PoolSelectShow,
                list: Components.PoolSelectShow,
              },
              availableValues: pools.map(pool => ({
                value: pool.id, // Pool ID
                label: pool.title.en || pool.title.es || 'No Title Available', // Fallback label
              })),
            },
          }
        },
      },
    ],
    rootPath: '/admin',
    branding: {
      companyName: process.env.APP_NAME,
      softwareBrothers: false,
      logo: `${process.env.APP_URL}/logos/donorLogoBlack.svg`,
      admin: { title: 'Resources' },
    },
    locale: {
      language: 'en',
      availableLanguages: ['en'],
      localeDetection: false,
      withBackend: false,
      translations: {
        en: {
          labels: {
            pools: 'Pools',
            Resources: 'Resources',
            transactions: 'Transactions',
            active: {
              true: 'Yes',
              false: 'No'
            },
            type: {
              normal: 'Normal',
              social: 'Social',
              million: 'Million',
              Normal: 'Normal',
              Social: 'Social',
              Million: 'Million'
            },
          },
          properties: {
            title: 'Title',
            id: 'ID',
            updatedAt: 'Updated At',
            createdAt: 'Created At',
            entry_amount: 'Entry Amount',
            prize_amount: 'Prize Amount',
            eth_address: 'Eth Address',
            type: 'Type',
            description: 'Description',
            active: 'Active',
            blockHash: 'Block Hash',
            blockNumber: 'Block Number',
            gas: 'Gas',
            gasPrice: 'Gas Price',
            gasUsed: 'Gas Used',
            hash: 'Hash',
            timeStamp: 'Time Stamp',
            txreceipt_status: 'Txreceipt Status',
            value: 'Value',
            poolId: 'Pool Id',
          },
        },
      },
    },
    componentLoader,
  });

  // Build and return the AdminJS router
  return AdminJSExpress.buildRouter(adminJS);
}
