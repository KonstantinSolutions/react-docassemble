import React from 'react';
import {FormGroup, Input, Label} from 'reactstrap';

export default function Field({
  datatype,
  variable_name,
  label,
  required,
  value,
  choices,
  setField
}) {
  return (
    <FormGroup>
      <Label for={variable_name}>{label}</Label>
      {choices ? (
        <Input
          type="select"
          value={value}
          onChange={e => setField({[variable_name]: e.target.value})}
        >
          <option value={null}>Select...</option>
          {choices.map(choice => (
            <option key={choice.value} value={choice.value}>
              {choice.label}
            </option>
          ))}
        </Input>
      ) : (
        <Input
          type={datatype}
          name={variable_name}
          value={value || ''}
          onChange={e => setField({[variable_name]: e.target.value})}
        />
      )}
    </FormGroup>
  );
}
