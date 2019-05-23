import React, {useContext} from 'react';
import {InterviewContext} from '../context';

export default function useBack() {
  const {i, session, setQuestion} = useContext(InterviewContext);
  function goBack() {
    fetch(`/docassemble/api/session/back`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        i,
        session
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log('res in go back', data);
        setQuestion(data);
      })
      .catch(e => {
        console.log(e.message, 'error in go back');
      });
  }
  return [goBack];
}
