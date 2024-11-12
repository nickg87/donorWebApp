
export const fileResourceOptions = (Resource, Components, deleteFileAction, bulkDeleteFileAction) => ({
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
      select: {
        isAccessible: true,
        component: Components.FileSelectGallery,
      },
    },
    navigation: {
      name: 'Assets',
      icon: 'HardDrive',
    },
    translations: {
      en: {
        properties: {
          filename: 'Thumbnail',
        }
      }
    },
    actions: {
      delete: {
        isVisible: true,
        before: deleteFileAction, // Use the imported deleteFileAction
      },
      bulkDelete: bulkDeleteFileAction
    }
  }
});
