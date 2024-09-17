import React, { useState } from 'react';

const TranslatedFieldsTabs = ({ record, onChange }) => {
  const [currentTab, setCurrentTab] = useState('en');

  const handleTabChange = (lang) => {
    setCurrentTab(lang);
  };

  const handleFieldChange = (field) => (event) => {
    const newValue = event.target.value;
    onChange({
      ...record,
      [field]: {
        ...record[field],
        [currentTab]: newValue,
      },
    });
  };

  return (
    <div>
      <div>
        <button onClick={() => handleTabChange('en')} className={currentTab === 'en' ? 'active' : ''}>English</button>
        <button onClick={() => handleTabChange('es')} className={currentTab === 'es' ? 'active' : ''}>Spanish</button>
        {/* Add more buttons for additional languages */}
      </div>
      <div>
        <label>
          Title:
          <input
            type="text"
            value={record.title[currentTab] || ''}
            onChange={handleFieldChange('title')}
          />
        </label>
        <label>
          Description:
          <textarea
            value={record.description[currentTab] || ''}
            onChange={handleFieldChange('description')}
          />
        </label>
      </div>
    </div>
  );
};

export default TranslatedFieldsTabs;
