// components/MultilingualTextField.js
const React = require('react');
const { useState, useEffect } = React;

function MultilingualTextField({ property, record, onChange }) {
  const [languages, setLanguages] = useState(['en', 'es']); // Adjust languages as needed
  const [values, setValues] = useState(record[property.name] || {});

  useEffect(() => {
    setValues(record[property.name] || {});
  }, [record, property.name]);

  const handleChange = (language, value) => {
    setValues({
      ...values,
      [language]: value,
    });
    onChange(values);
  };

  return React.createElement('div', null,
    languages.map((language) =>
      React.createElement('div', { key: language },
        React.createElement('label', null, language),
        React.createElement('input', {
          type: 'text',
          value: values[language] || '',
          onChange: (e) => handleChange(language, e.target.value),
        })
      )
    )
  );
}

module.exports = MultilingualTextField;
