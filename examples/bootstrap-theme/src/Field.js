import React from 'react';
import {FormGroup, Input, Label} from 'reactstrap';

export default function Field({
  datatype,
  variable_name,
  label,
  required,
  value,
  setField
}) {
  return (
    <FormGroup>
      <Label for={variable_name}>{label}</Label>
      <Input
        type="datatype"
        name={variable_name}
        value={value || ''}
        onChange={e => setField({[variable_name]: e.target.value})}
      />
    </FormGroup>
  );
}
