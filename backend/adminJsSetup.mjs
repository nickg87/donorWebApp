//adminJsSetup.mjs
import {fileURLToPath} from 'url';
import path from 'path';
import AdminJS, {ComponentLoader} from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/sequelize';
import { Sequelize } from 'sequelize';

// Import models
import poolModel from './models/pools.js';
import transactionModel from './models/transactions.js';
import articlesModel from './models/articles.js';
import filesModel from './models/files.js';

//Import resource definitions
import {articleResourceOptions} from "./resources/articleResource.js";
import {fileResourceOptions} from "./resources/fileResource.js";
import {transactionResourceOptions} from "./resources/transactionResource.js";
import {poolResourceOptions} from "./resources/poolResource.js";
import {deleteFileAction, bulkDeleteFileAction} from "./actions/deleteFileAction.js";

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
const Article = articlesModel(sequelize, Sequelize.DataTypes);
const File = filesModel(sequelize, Sequelize.DataTypes);

// Determine the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to fetch all pools
const getAllPools = async () => {
  return await Pool.findAll(); // Fetch pools from your database
};

export async function setupAdminJS() {
  const pools = await getAllPools(); // Fetch the pools data
  const componentLoader = new ComponentLoader();

  const Components = {
    PoolTitleEdit: componentLoader.add('PoolTitleEdit', './components/MultiLingual/Pool/TitleEdit'),
    PoolTitleShow: componentLoader.add('PoolTitleShow', './components/MultiLingual/Pool/TitleShow'),
    PoolTitleList: componentLoader.add('PoolTitleList', './components/MultiLingual/Pool/TitleList'),
    PoolDescriptionEdit: componentLoader.add('PoolDescriptionEdit', './components/MultiLingual/Pool/DescriptionEdit'),
    PoolDescriptionShow: componentLoader.add('PoolDescriptionShow', './components/MultiLingual/Pool/DescriptionShow'),
    PoolDescriptionList: componentLoader.add('PoolDescriptionList', './components/MultiLingual/Pool/DescriptionList'),
    ArticleTitleEdit: componentLoader.add('ArticleTitleEdit', './components/MultiLingual/Article/TitleEdit'),
    ArticleTitleShow: componentLoader.add('ArticleTitleShow', './components/MultiLingual/Article/TitleShow'),
    ArticleTitleList: componentLoader.add('ArticleTitleList', './components/MultiLingual/Article/TitleList'),
    MultiLingualFieldEdit: componentLoader.add('MultiLingualFieldEdit', './components/MultiLingual/Article/MultiLingualFieldEdit'),
    PoolSelectEdit: componentLoader.add('PoolSelectEdit', './components/PoolSelectEdit'),
    PoolSelectShow: componentLoader.add('PoolSelectShow', './components/PoolSelectShow'),
    PoolSelectList: componentLoader.add('PoolSelectList', './components/PoolSelectList'),
    TransactionCountList: componentLoader.add('TransactionCountList', './components/TransactionCountList'),
    TransactionCountShow: componentLoader.add('TransactionCountShow', './components/TransactionCountShow'),
    DrawnDataShow: componentLoader.add('DrawnDataShow', './components/DrawnDataShow'),
    FileUploadEdit: componentLoader.add('FileUploadEdit', './components/FileUploadEdit'),
    FileThumbnail: componentLoader.add('FileThumbnail', './components/FileThumbnail'),
    FileShow: componentLoader.add('FileShow', './components/FileShow'),
  }

  // Initialize AdminJS
  const adminJS = new AdminJS({
    resources: [
      poolResourceOptions(Pool, Components),
      transactionResourceOptions(Transaction, Components, pools),
      articleResourceOptions(Article, Components),
      fileResourceOptions(File, Components, deleteFileAction, bulkDeleteFileAction()),
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
            filename: 'Custom Thumbnail',
            files: 'Files',
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
            drawn_status: {
              'Inactive': 'Inactive',
              'inactive': 'Inactive',
              'Pending': 'Pending',
              'pending': 'Pending',
              'In progress': 'In progress',
              'in_progress': 'In progress',
              'Completed': 'Completed',
              'completed': 'Completed',
            }
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
            transactionCount: 'Transaction Count',
            drawn_at: 'Drawn at',
            drawn_data: 'Drawn data',
            drawn_status: 'Drawn status',
            uploadedAt: 'Uploaded at',
          },
        },
      },
    },
    componentLoader,
  });

  // Build and return the AdminJS router
  return AdminJSExpress.buildRouter(adminJS);
}
