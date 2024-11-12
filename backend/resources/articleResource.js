
export const articleResourceOptions = (Resource, Components, File) => ({
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
      files: {
        type: 'mixed', // The 'files' field stores the IDs of selected files
        isArray: true,
        reference: 'files',
        components: {
          edit: Components.FileSelectGallery, // Use the gallery for file selection
        },
      },
    },
    actions: {
      new: {
        before: async (request) => {
          const fileKeys = Object.keys(request.payload).filter(key => key.startsWith('files.'));
          if (fileKeys.length > 0) {
            const fileIds = fileKeys.map(key => request.payload[key]);
            request.payload.files = fileIds.map(fileId => ({
              file_id: fileId,
              target_type: 'article',
            }));
          }
          return request;
        },
        after: async (response, request, context) => {
          console.log('request.payload in after:');
          console.log(request.payload);
          const { record } = context;
          if (record.isValid() && request.payload.files) {
            const article = await Resource.findByPk(record.id(), {
              include: [{ model: File, as: 'files' }]
            });
            await article.setFiles(request.payload.files.map(file => file.file_id));
          }
          return response;
        },
      },
      edit: {
        before: async (request) => {
          const fileKeys = Object.keys(request.payload).filter(key => key.startsWith('files.'));
          if (fileKeys.length > 0) {
            const fileIds = fileKeys.map(key => request.payload[key]);
            request.payload.files = fileIds.map(fileId => ({
              file_id: fileId,
              target_type: 'article',
            }));
          }
          return request;
        },
        after: async (response, request, context) => {
          console.log('request.payload in after:');
          console.log(request.payload);
          const { record } = context;
          if (record.isValid() && request.payload.files) {
            const article = await Resource.findByPk(record.id(), {
              include: [{ model: File, as: 'files' }]
            });
            await article.setFiles(request.payload.files.map(file => file.file_id));
          }
          return response;
        },
      },
    },
    navigation: {
      name: 'Articles',
      icon: 'Book'
    },
  },
});