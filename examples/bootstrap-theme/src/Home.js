import React, {useContext} from 'react';
import {InterviewContext} from 'react-docassemble';

function StartInterview({i, title, onStart}) {
  const {startInterview} = useContext(InterviewContext);
  return <button onClick={() => startInterview({i, onStart})}>{title}</button>;
}

export default function Interview({history}) {
  return (
    <StartInterview
      i="docassemble.playground1:test1.yml"
      title="Start Interview"
      onStart={() => history.push('/session/question')}
    />
  );
}
