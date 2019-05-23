import React, {useContext, useState, useEffect} from 'react';
import {InterviewContext} from '../context';

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
