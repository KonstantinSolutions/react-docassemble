import React from 'react';
import {FormGroup, Input, Label} from 'reactstrap';

function Required() {
  return <span style={{color: 'red', marginLeft: 5}}>*</span>;
}

function Error({message}) {
  return <div style={{color: 'red'}}>{message}</div>;
}

export default function Field({
  error,
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
      <Label for={variable_name}>
        {label} {required ? <Required /> : null}
      </Label>
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
      <Error message={error} />
    </FormGroup>
  );
}
