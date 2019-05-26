import React, {useContext} from 'react';
import Field from './Field';
import {Button, Container} from 'reactstrap';
import {InterviewContext} from 'react-docassemble';

export default function CurrentQuestion(props) {
  const {
    question,
    variables,
    errors,
    goBack,
    saveVariables,
    setVariable
  } = useContext(InterviewContext);

  if (!question) {
    return null;
  }
  function setField(e) {
    setVariable(e.target.name, e.target.value);
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
        <Button onClick={saveVariables}>Continue</Button>
      ) : null}
    </Container>
  );
}
