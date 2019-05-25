import React, {useState} from 'react';
import Field from './Field';
import {Button} from 'reactstrap';
import {useCurrentQuestion} from 'react-docassemble';

export default function CurrentQuestion(props) {
  const [question, saveVariables] = useCurrentQuestion();
  const [variables, setVariables] = useState({});

  if (!question) {
    return null;
  }
  function setField(variable) {
    setVariables({
      ...variables,
      ...variable
    });
  }
  const {questionText, questionType, fields} = question;
  console.log(variables, question);
  return (
    <div>
      <h1>{questionText}</h1>
      {fields ? (
        <div>
          {fields.map(field => (
            <Field
              key={field.variable_name}
              {...field}
              value={variables[field.variable_name]}
              setField={setField}
            />
          ))}
        </div>
      ) : null}
      {questionType !== 'deadend' ? (
        <Button onClick={() => saveVariables(variables)}>Continue</Button>
      ) : null}
    </div>
  );
}
