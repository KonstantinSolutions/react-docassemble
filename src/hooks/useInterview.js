import React, {useContext} from 'react';
import {InterviewContext} from '../context';

export default function useInterview({filename, onStart}) {
  const {setSession, setFilename} = useContext(InterviewContext);
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
  return [startInterview];
}
