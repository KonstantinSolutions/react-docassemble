import React, {useState} from 'react';
import Field from './Field';
import {Button, Container} from 'reactstrap';
import {useCurrentQuestion, useBack} from 'react-docassemble';

export default function CurrentQuestion(props) {
  const [question, saveVariables] = useCurrentQuestion();
  const [variables, setVariables] = useState({});
  const [errors, setErrors] = useState({});
  const [goBack] = useBack();

  if (!question) {
    return null;
  }
  function setField(variable) {
    setVariables({
      ...variables,
      ...variable
    });
  }

  function submit() {
    const errorObj = saveVariables(variables);
    if (errorObj) {
      setErrors(errorObj);
    }
  }
  const {questionText, questionType, fields, allow_going_back} = question;
  return (
    <Container>
      <h1>{questionText}</h1>
      {fields ? (
        <div>
          {fields.map(field => (
            <Field
              key={field.variable_name}
              {...field}
              value={variables[field.variable_name]}
              error={errors[field.variable_name]}
              setField={setField}
            />
          ))}
        </div>
      ) : null}
      {allow_going_back ? <Button onClick={goBack}>Back</Button> : null}
      {questionType !== 'deadend' ? (
        <Button onClick={submit}>Continue</Button>
      ) : null}
    </Container>
  );
}
