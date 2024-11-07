///import {ComponentLoader} from "adminjs";

//const componentLoader = new ComponentLoader();

// const Components = {
//   //create some custom component to upload files
//   FileUploadEdit: componentLoader.add('FileUploadEdit', '../components/FileUploadEdit'),
//   FileThumbnail: componentLoader.add('FileThumbnail', '../components/FileThumbnail'),
//   FileShow: componentLoader.add('FileShow', '../components/FileShow'),
// }

export const fileResourceOptions = (Resource, Components) => ({
  resource: Resource,
  options: {
    listProperties: ['id', 'filename', 'path', 'uploadedAt'],
    properties: {
      filename: {
        type: 'string',
        isTitle: true,
        isVisible: { list: true, show: true, edit: false },
        components: {
          list: Components.FileThumbnail,
          show: Components.FileShow,
        },
      },
      path: {
        type: 'string',
        isVisible: false,
      },
      file: {
        type: 'file',
        isVisible: { list: false, show: false, edit: true },
        components: {
          edit: Components.FileUploadEdit,
        }
      },
      uploadedAt: {
        isVisible: { list: true, show: false, edit: false }
      },
    },
    navigation: {
      name: 'Assets',
      icon: 'File',
    },
    translations: {
      en: {
        properties: {
          filename: 'Thumbnail',
        }
      }
    },
  }
});
