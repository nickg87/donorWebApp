import React, { useState, useEffect } from 'react';
import { ApiClient } from 'adminjs';

const FileSelectGallery = ({ onChange, record }) => {
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(new Set(record.params.files || []));

  useEffect(() => {
    // Fetch files for the gallery
    fetchFiles()
      .then(fetchedFiles => setFiles(fetchedFiles))
      .catch(error => console.error('Error fetching files:', error));
  }, []);

  const fetchFiles = async () => {
    const api = new ApiClient();
    const response = await api.resourceAction({ resourceId: 'files', actionName: 'list' });
    console.log(response.data.records);
    return response.data.records;
  };

  const handleFileSelection = (file) => {
    const updatedSelection = new Set(selectedFiles);

    // Toggle file selection
    if (updatedSelection.has(file.id)) {
      updatedSelection.delete(file.id);
    } else {
      updatedSelection.add(file.id);
    }

    setSelectedFiles(updatedSelection);

    // Update parent record's params to include selected file IDs
    onChange('files', Array.from(updatedSelection));
  };

  return (
    <div className="file-gallery">
      <h3>Select Images for this Article</h3>
      <div className="file-grid">
        {files.map(file => (
          <div
            key={file.id}
            className={`file-item ${selectedFiles.has(file.id) ? 'selected' : ''}`}
            onClick={() => handleFileSelection(file)}
          >
            <img className="file-image" src={`/public${file.params.path}`} alt={file.params.filename} />
            <div className="file-info">
              <span className="file-name">{file.params.filename}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileSelectGallery;