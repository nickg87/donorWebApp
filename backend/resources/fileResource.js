import {ComponentLoader} from "adminjs";

const componentLoader = new ComponentLoader();

const Components = {
  //add here custom components
  ///ArticleTitleEdit: componentLoader.add('ArticleTitleEdit', '../components/MultiLingual/Article/TitleEdit'),
}

export const fileResourceOptions = (Resource) => ({
  resource: Resource,
  options: {
    listProperties: ['id', 'name', 'path', 'uploadedAt'],
    properties: {
      name: {
        type: 'string',
      },
      path: {
        type: 'string',
        isVisible: true,
      },
      file: {
        type: 'file',
        isVisible: { list: true, show: true, edit: true },
      },
    },
    navigation: {
      name: 'Assets',
      icon: 'File'
    },
  },
});