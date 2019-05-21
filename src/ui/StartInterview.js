import React, { useContext } from 'react';
import { InterviewContext } from '../context';

export function StartInterview({ filename, onStart, children }) {
  const { setSession, setFilename } = useContext(InterviewContext);
  function startInterview() {
    fetch(`/docassemble/api/session/new?i=${filename}`)
      .then(res => res.json())
      .then(data => {
        console.log(data, 'Datar33!!');
        setSession(data.session);
        setFilename(filename);
        onStart();
      });
  }
  return React.cloneElement(children, { onClick: startInterview })
}
