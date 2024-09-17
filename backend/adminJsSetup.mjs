// adminJsSetup.js

export async function setupAdminJS() {
  const { fileURLToPath } = await import('url');
  const path = (await import('path')).default;
  const { default: AdminJS } = await import('adminjs');
  const { ComponentLoader } = await import('adminjs');
  const { default: AdminJSExpress } = await import('@adminjs/express');
  //const MultilingualTextField =  await import('./components/MultilingualTextField.js');
  const { Database, Resource } = await import('@adminjs/sequelize');
  const { Sequelize } = await import('sequelize');
  const React = (await import('react')).default;

  AdminJS.registerAdapter({ Database, Resource });

  // Import model and initialize AdminJS with the model
  const poolModel = (await import('./models/pools.js')).default;
  const transactionModel = (await import('./models/transactions.js')).default;
  const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
  });

  const Pool = poolModel(sequelize, Sequelize.DataTypes);
  const Transaction = transactionModel(sequelize, Sequelize.DataTypes);

// Define a React component within this file
  const TestComponent = (props) => {
    return React.createElement('div', null, 'Hello from TestComponent!');
  };

  // Create and configure ComponentLoader

  // Determine the directory of the current module
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const componentLoader = new ComponentLoader();
  componentLoader.add('MultilingualTextField', './components/MultilingualTextField.js');


  const adminJS = new AdminJS({
    resources: [
      { resource: Pool,
        options: {
          properties: {
            title: {
              components: {
                edit: 'MultilingualTextField',
              },
              label: 'Title XXX',
            },
            description: {
              type: 'richtext',
              isVisible: { list: true, filter: true, show: true, edit: true },
            },
          },
          navigation: {
            name: 'Resources'
          }
        }
      },
      {
        resource: Transaction,
        options: {
          listProperties: ['id', 'blockHash', 'blockNumber', 'from', 'gas', 'gasPrice', 'gasUsed', 'hash', 'timeStamp', 'to', 'txreceipt_status', 'value', 'createdAt', 'poolId'],
          filterProperties: ['id', 'from', 'to', 'poolId'],
          sort: {
            direction: 'desc',
            sortBy: 'id',
          },
          navigation: { name: 'Resources' }
        },
      },
      // Add other models as needed
    ],
    rootPath: '/admin',
    branding: {
      companyName: process.env.APP_NAME,
      softwareBrothers: false,
      logo: process.env.APP_URL + '/logos/donorLogoBlack.svg',
      admin: {
        title: 'Resources',
      },
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
            poolId: 'Pool Id'
          },
        },
      },
    },
    componentLoader,
  });

  const adminRouter = AdminJSExpress.buildRouter(adminJS);

  return adminRouter;
}
