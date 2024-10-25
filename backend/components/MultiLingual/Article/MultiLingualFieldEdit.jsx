//backend/components/MultiLingual/Article/MultiLingualFieldEdit.jsx
import React, { useState, useEffect } from 'react';
import { Button, Input, TextArea, Label, Box } from '@adminjs/design-system';
import {capitalizeFirstLetter} from "../../../utils/miscellaneous.js";

const MultiLingualFieldEdit = ({property,  record = {}, onChange }) => {
  console.log(record);
  const fieldName = property.path;
  const label = property.label || fieldName;
  const [currentLang, setCurrentLang] = useState('en');

  // Extract the initial value from the nested params property
  let initialFieldValue = ((record.params && record.params[fieldName + '.' + currentLang]) || record[fieldName]) || {};
  console.log('initialFieldValue for ' + fieldName + ' fieldName: ' );
  console.log(initialFieldValue);

  const [fieldValue, setFieldValue] = useState(initialFieldValue);

  // Update fieldValue whenever currentLang changes
  useEffect(() => {
    setFieldValue(initialFieldValue);
  }, [currentLang]);

  // Handle language tab changes
  const handleLangChange = (lang) => {
    setCurrentLang(lang);
    setFieldValue(initialFieldValue);
  };

  // Handle input changes
  const handleInputChange = (event) => {
    const { value } = event.target;
    setFieldValue(value); // Update local state

    // Notify AdminJS about the change
    onChange({
      ...record,
      params: {
        ...record.params,
        [fieldName]: {
          ...record.params[fieldName],
          [currentLang]: value,
        },
      },
    });
  };

  return (
    <div className="adminjs-multilingual-edit"> {/* Custom class for styling */}
      <Box mb="lg" className="adminjs-multilingual-edit__tabs">
        <Button
          className={currentLang === 'en' ? 'active' : ''}
          style={{ backgroundColor: currentLang === 'en' ? '#ECEEFB' : '#fff'}}
          onClick={(event) => { event.preventDefault(); handleLangChange('en'); }}
        >
          English
        </Button>
        <Button
          className={currentLang === 'es' ? 'active' : ''}
          style={{ backgroundColor: currentLang === 'es' ? '#ECEEFB' : '#fff'}}
          onClick={(event) => { event.preventDefault(); handleLangChange('es'); }}
        >
          Spanish
        </Button>
      </Box>
      <Box mb="lg">
        <div className="adminjs-multilingual-edit__input">
          <Label htmlFor={fieldName}>{`${capitalizeFirstLetter(label)} (${currentLang}):`}</Label>
            <Input
              type="text"
              id={fieldName}
              value={fieldValue || ''}
              onChange={handleInputChange}
              style={{ width: '100%'}}
            />
        </div>
      </Box>
    </div>
  );
};

export default MultiLingualFieldEdit;
