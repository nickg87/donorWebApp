import React, { useState, useEffect } from 'react';
import { ApiClient } from 'adminjs';
import { fetchIsLocal } from '../utils/miscellaneous';

const FileSelectGallery = ({ onChange, record }) => {
  const [isLocal, setIsLocal] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(new Set(record.params.files || []));

  useEffect(() => {
    const getIsLocal = async () => {
      const isLocalValue = await fetchIsLocal();
      setIsLocal(isLocalValue);
    };
    if (isLocal === null) {
      getIsLocal();
    }
  }, [isLocal]);

  useEffect(() => {
    fetchFiles()
      .then((fetchedFiles) => setFiles(fetchedFiles))
      .catch((error) => console.error('Error fetching files:', error));

    if (record.id) {
      fetchAssociatedFiles(record.id)
        .then((associatedFiles) => {
          const selectedFileIds = new Set(associatedFiles.map((file) => file.id));
          setSelectedFiles(selectedFileIds);
          onChange('files', Array.from(selectedFileIds)); // Ensure the parent record is updated
        })
        .catch((error) => console.error('Error fetching associated files:', error));
    }
  }, [record.id]);

  const fetchFiles = async () => {
    const api = new ApiClient();
    const response = await api.resourceAction({ resourceId: 'files', actionName: 'list' });
    return response.data.records;
  };

  const fetchAssociatedFiles = async (articleId) => {
    const api = new ApiClient();
    const response = await api.resourceAction({
      resourceId: 'file_assignments',
      actionName: 'list',
      params: {
        filters: { target_id: articleId, target_type: 'article' },
      },
    });

    const fileAssignments = response.data.records;
    const fileIds = fileAssignments.map((assignment) => assignment.params.file_id);

    if (fileIds.length > 0) {
      const filesResponse = await api.resourceAction({
        resourceId: 'files',
        actionName: 'list',
        params: {
          filters: { id: fileIds },
        },
      });
      return filesResponse.data.records;
    }

    return [];
  };

  const handleFileSelection = (file) => {
    const updatedSelection = new Set(selectedFiles);

    if (updatedSelection.has(file.id)) {
      updatedSelection.delete(file.id);
    } else {
      updatedSelection.add(file.id);
    }

    setSelectedFiles(updatedSelection);
    onChange('files', Array.from(updatedSelection));
  };

  // Render logic
  return (
    <div className="file-gallery">
      {isLocal === null ? (
        <div>Loading...</div>
      ) : (
        <>
          <h3>Select Images for this Article</h3>
          <div className="file-grid">
            {files.map((file) => (
              <div
                key={file.id}
                className={`file-item ${selectedFiles.has(file.id) ? 'selected' : ''}`}
                onClick={() => handleFileSelection(file)}
              >
                <img
                  className="file-image"
                  src={(isLocal ? '/public' : '') + `${file.params.path}`}
                  alt={file.params.filename}
                />
                <div className="file-info">
                  <span className="file-name">{file.params.filename}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};


export default FileSelectGallery;