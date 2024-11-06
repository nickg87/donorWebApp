import {ComponentLoader} from "adminjs";

const componentLoader = new ComponentLoader();

const Components = {
  PoolTitleEdit: componentLoader.add('PoolTitleEdit', '../components/MultiLingual/Pool/TitleEdit'),
  PoolTitleShow: componentLoader.add('PoolTitleShow', '../components/MultiLingual/Pool/TitleShow'),
  PoolTitleList: componentLoader.add('PoolTitleList', '../components/MultiLingual/Pool/TitleList'),
  PoolDescriptionEdit: componentLoader.add('PoolDescriptionEdit', '../components/MultiLingual/Pool/DescriptionEdit'),
  PoolDescriptionShow: componentLoader.add('PoolDescriptionShow', '../components/MultiLingual/Pool/DescriptionShow'),
  PoolDescriptionList: componentLoader.add('PoolDescriptionList', '../components/MultiLingual/Pool/DescriptionList'),
  TransactionCountList: componentLoader.add('TransactionCountList', '../components/TransactionCountList'),
  TransactionCountShow: componentLoader.add('TransactionCountShow', '../components/TransactionCountShow'),
  DrawnDataShow: componentLoader.add('DrawnDataShow', '../components/DrawnDataShow'),
}

export const poolResourceOptions = (Resource) => ({
  resource: Resource,
  options: {
    listProperties: ['title', 'id', 'transactionCount', 'updated_at', 'entry_amount', 'prize_amount', 'active', 'type', 'drawn_status', 'eth_address'],
    properties: {
      title: {
        type: 'string',
        components: {
          edit: Components.PoolTitleEdit,
          show: Components.PoolTitleShow,
          list: Components.PoolTitleList,
        },
      },
      description: {
        type: 'richtext',
        components: {
          edit: Components.PoolDescriptionEdit,
          show: Components.PoolDescriptionShow,
          list: Components.PoolDescriptionList,
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
      drawn_data: {
        type: 'text',
        components: {
          show: Components.DrawnDataShow,
        },
      },
      transactionCount: {
        isVisible: { list: true, show: true, edit: false },
        type: 'number',
        label: 'Transactions',
        isDisabled: true,
        components: {
          list: Components.TransactionCountList,
          show: Components.TransactionCountShow,
        },
      },
      drawn_status: {
        type: 'select',
        availableValues: [
          { value: 'inactive', label: 'Inactive' },
          { value: 'pending', label: 'Pending' },
          { value: 'in_progress', label: 'In progress' },
          { value: 'completed', label: 'Completed' },
        ],
      }
    },
    navigation: {
      name: 'Resources',
      icon: 'Database'
    },
  },
});