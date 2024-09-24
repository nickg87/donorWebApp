import React, { useState, useEffect } from 'react';
import { Box, Label, Select } from '@adminjs/design-system';

const PoolSelectEdit = ({ record, resource, onChange }) => {
  console.log('record:');
  console.log(record);
  console.log('resource:');
  const { params } = record;

  // Get available pool options
  const availableValues = resource?.properties?.poolId?.availableValues || [];

  // Find the object that matches the poolId from params
  const findDefaultValue = () => {
    return availableValues.find(option => option.value === params.poolId);
  };

  // Set the default selected value from params.poolId
  const [selectedValue, setSelectedValue] = useState(findDefaultValue() || { value: '', label: 'Select a Pool' });

  useEffect(() => {
    // If poolId in params changes or new data comes in, reset the selected value
    setSelectedValue(findDefaultValue() || { value: '', label: 'Select a Pool' });
  }, [params.poolId, availableValues]);

  const handleSelectChange = (value) => {
    console.log('Selected Pool ID:', value);

    setSelectedValue(value);

    // Update the record with the new poolId
    onChange({
      ...record,
      params: {
        ...record.params,
        poolId: value.value, // Update poolId in record.params
      },
    });
  };

  return (
    <Box mb="lg">
      <Label htmlFor={resource?.properties?.poolId?.name} style={{ color: '#000', fontWeight: 'normal' }}>
        {resource?.properties?.poolId?.label}
      </Label>
      <Select
        value={selectedValue}  // selectedValue is an object with value and label
        onChange={handleSelectChange}
        options={availableValues} // Ensure options are in the correct format [{value, label}]
      />
    </Box>
  );
};

export default PoolSelectEdit;
