import {isEmail} from 'validator';

const defaultValidators = {
  required: value => (!value ? 'You need to fill this in.' : null),
  email: value => (!isEmail(value || '') ? 'Not a valid email' : null)
};

function getValidators(field) {
  let validators = [];
  if (field.required) {
    validators = validators.concat(defaultValidators.required);
  }
  if (field.datatype === 'email') {
    validators = validators.concat(defaultValidators.email);
  }
  return validators;
}

export function validate(question, variables) {
  const errors = question.fields.reduce((acc, field) => {
    const value = variables[field.variable_name];
    const validators = getValidators(field);
    const fieldErrors = validators
      .map(validator => validator(value))
      .filter(error => Boolean(error));
    console.log(field, fieldErrors);
    if (fieldErrors.length > 0) {
      acc[field.variable_name] = fieldErrors[0];
    }
    return acc;
  }, {});
  return errors;
}
