const defaultValidators = {
  required: value => (!value ? 'You need to fill this in.' : null)
};

function getValidators(field) {
  let validators = [];
  if (field.required) {
    validators = validators.concat(defaultValidators.required);
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