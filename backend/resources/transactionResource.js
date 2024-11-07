// import {ComponentLoader} from "adminjs";
//
// const componentLoader = new ComponentLoader();
//
// const Components = {
//   PoolSelectEdit: componentLoader.add('PoolSelectEdit', '../components/PoolSelectEdit'),
//   PoolSelectShow: componentLoader.add('PoolSelectShow', '../components/PoolSelectShow'),
//   PoolSelectList: componentLoader.add('PoolSelectList', '../components/PoolSelectList'),
// }

export const transactionResourceOptions = (Resource, Components, pools) => ({
  resource: Resource,
  options: {
    listProperties: ['id', 'blockHash', 'blockNumber', 'from', 'gas', 'gasPrice', 'gasUsed', 'hash', 'timeStamp', 'txreceipt_status', 'value', 'createdAt', 'poolId'],
    filterProperties: ['id', 'from', 'to', 'poolId'],
    sort: {direction: 'desc', sortBy: 'id'},
    navigation: {
      name: 'Resources',
      icon: 'Tasks'
    },
    properties: {
      poolId: {
        components: {
          edit: Components.PoolSelectEdit,
          show: Components.PoolSelectShow,
          list: Components.PoolSelectList,
        },
        availableValues: pools.map(pool => ({
          value: pool.id, // Pool ID
          label: pool.title.en || pool.title.es || 'No Title Available', // Fallback label
        })),
      },
    }
  },
});