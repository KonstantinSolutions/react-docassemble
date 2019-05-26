import React, {useContext, useState, useEffect} from 'react';
import {InterviewContext} from '../context';

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

function validate(question, variables) {
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
  console.log(question.fields, errors, 'errors in validate');
  return errors;
}

export default function useQuestion() {
  const {session, i, question, setQuestion} = useContext(InterviewContext);

  function fetchQuestion() {
    fetch(`/docassemble/api/session/question?i=${i}&session=${session}`)
      .then(res => res.json())
      .then(data => {
        setQuestion(data);
      });
  }

  function saveVariables(variables) {
    console.log(
      JSON.stringify({
        i,
        session,
        variables
      }),
      'variables'
    );
    const errors = validate(question, variables);
    if (Object.keys(errors).length > 0) {
      return errors;
    }
    fetch(`/docassemble/api/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        i,
        session,
        variables
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data, 'res of save variables');
        setQuestion(data);
      })
      .catch(e => {
        console.log(e.message, 'error in saveVariables');
      });
  }

  useEffect(() => {
    fetchQuestion();
  }, []);
  return [question, saveVariables];
}
