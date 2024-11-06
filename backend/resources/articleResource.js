import {ComponentLoader} from "adminjs";

const componentLoader = new ComponentLoader();

const Components = {
  ArticleTitleEdit: componentLoader.add('ArticleTitleEdit', '../components/MultiLingual/Article/TitleEdit'),
  ArticleTitleShow: componentLoader.add('ArticleTitleShow', '../components/MultiLingual/Article/TitleShow'),
  ArticleTitleList: componentLoader.add('ArticleTitleList', '../components/MultiLingual/Article/TitleList'),
  MultiLingualFieldEdit: componentLoader.add('MultiLingualFieldEdit', '../components/MultiLingual/Article/MultiLingualFieldEdit'),
}

export const articleResourceOptions = (Resource) => ({
  resource: Resource,
  options: {
    listProperties: ['title', 'id', 'views', 'updated_at', 'short', 'active'],
    properties: {
      title: {
        type: 'string',
        components: {
          edit: Components.MultiLingualFieldEdit,
          show: Components.ArticleTitleShow,
          list: Components.ArticleTitleList,
        },
      },
      short: {
        type: 'string',
        components: {
          edit: Components.MultiLingualFieldEdit,
        },
      },
      meta: {
        type: 'string',
        components: {
          edit: Components.MultiLingualFieldEdit,
        },
      },
    },
    navigation: {
      name: 'Articles',
      icon: 'Book'
    },
  },
});