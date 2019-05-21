import React, { useContext } from 'react';
import { InterviewContext } from '../context';

export function StartInterview({ filename, title, onStart }) {
  const { setSession, setFilename } = useContext(InterviewContext);
  function startInterview() {
    fetch(`/docassemble/api/session/new?i=${filename}`)
      .then(res => res.json())
      .then(data => {
        console.log(data, 'Data!');
        setSession(data.session);
        setFilename(filename);
        onStart();
      });
  }
  return <button onClick={startInterview}>{title}</button>;
}
