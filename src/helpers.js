import { isEmail, isMobilePhone } from "validator";

const defaultValidators = {
  required: value => (!value ? "You need to fill this in." : null),
  email: value => value && !isEmail(value) ? "Not a valid email" : null),
  tel: value =>
    value && !isMobilePhone(value) ? "Not a valid phone number" : null
};

function getValidators(field) {
  let validators = [];
  if (field.required) {
    validators = validators.concat(defaultValidators.required);
  }
  if (field.datatype === "email") {
    validators = validators.concat(defaultValidators.email);
  }
  if (field.datatype === "tel") {
    validators = validators.concat(defaultValidators.tel);
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
    if (fieldErrors.length > 0) {
      acc[field.variable_name] = fieldErrors[0];
    }
    return acc;
  }, {});
  return errors;
}

export function filterVariablesByQuestion(question, variables) {
  const filteredVariables = question.fields.reduce((acc, field) => {
    acc[field.variable_name] = variables[field.variable_name];
    return acc;
  }, {});
  return filteredVariables;
}
