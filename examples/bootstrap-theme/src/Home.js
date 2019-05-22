import React from 'react';
import { useInterview } from 'react-docassemble';

function StartInterview({ filename, title, onStart }) {
  const [startInterview] = useInterview({ filename, onStart });
  return <button onClick={startInterview}>{title}</button>;
}

export default function Interview({ history }) {
  return (
    <StartInterview
      filename="docassemble.playground1:test.yml"
      title="Start Interview"
      onStart={() => history.push('/session/question')}
    />
  );
}
