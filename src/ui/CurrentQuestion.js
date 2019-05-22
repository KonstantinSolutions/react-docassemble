import React, { useContext, useState, useEffect } from "react";
import { InterviewContext } from "../context";
import Field from "./Field";
import { Button } from "reactstrap"

export default function CurrentQuestion(props) {
  const { session, i } = useContext(InterviewContext);
  const [question, setQuestion] = useState();
  const [variables, setVariables] = useState({});

  function fetchQuestion() {
    fetch(`/docassemble/api/session/question?i=${i}&session=${session}`)
      .then(res => res.json())
      .then(data => {
        setQuestion(data);
      });
  }

  function saveVariables() {
    fetch(`/docassemble/api/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        i,
        session,
        variables
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setQuestion(data);
      });
  }

  useEffect(() => {
    fetchQuestion();
  }, []);

  if (!question) {
    return null;
  }
  function setField(variable) {
    setVariables({
      ...variables,
      ...variable
    });
  }
  const { questionText, questionType, fields } = question;
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
      {questionType !== "deadend" ? (
        <Button onClick={saveVariables}>Continue</Button>
      ) : null}
    </div>
  );
}
