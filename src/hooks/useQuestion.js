import React, { useContext, useState, useEffect } from 'react';
import { InterviewContext } from '../context';

export default function useQuestion() {
  const { session, i } = useContext(InterviewContext);
  const [question, setQuestion] = useState();

  function fetchQuestion() {
    fetch(`/docassemble/api/session/question?i=${i}&session=${session}`)
      .then(res => res.json())
      .then(data => {
        setQuestion(data);
      });
  }

  function saveVariables(variables) {
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
        console.log(data);
        setQuestion(data);
      });
  }

  useEffect(() => {
    fetchQuestion();
  }, []);
  return [question, saveVariables];
}
