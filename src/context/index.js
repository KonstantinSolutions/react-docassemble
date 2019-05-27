import React, {useState, useEffect} from 'react';
import useLocalStorage from 'react-use-localstorage';
import {get, post} from '../api';
import {validate} from '../helpers';

export const InterviewContext = React.createContext({});

export function InterviewProvider(props) {
  const [session, setSession] = useLocalStorage('session', null);
  const [i, setFilename] = useLocalStorage('filename', null);
  const [question, setQuestion] = useState();
  const [variables, setVariables] = useState({});
  const [errors, setErrors] = useState({});

  function reset() {
    setSession(null);
    setFilename(null);
  }
  function setVariable(name, value) {
    setVariables({
      ...variables,
      [name]: value
    });
  }

  function isValid() {
    const errors = validate(question, variables);
    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      return false;
    }
    return true;
  }

  function fetchQuestion() {
    return get(
      `/docassemble/api/session/question?i=${i}&session=${session}`
    ).then(data => {
      setQuestion(data);
    });
  }

  function startInterview({i, onStart}) {
    reset();
    return get(`/docassemble/api/session/new?i=${i}`).then(data => {
      setSession(data.session);
      setFilename(i);
      onStart && onStart();
    });
  }

  function goBack() {
    return post(`/docassemble/api/session/back`, {i, session}).then(data => {
      setQuestion(data);
    });
  }

  function saveVariables() {
    if (!isValid()) {
      return;
    }
    return post(`/docassemble/api/session`, {
      i,
      session,
      variables
    }).then(data => {
      setQuestion(data);
    });
  }

  useEffect(() => {
    if (session && i) {
      fetchQuestion();
    }
  }, [session, i]);

  const contextValue = {
    session,
    i,
    question,
    variables,
    errors,
    setSession,
    setFilename,
    setQuestion,
    setVariable,
    setErrors,
    startInterview,
    goBack,
    saveVariables
  };

  return (
    <InterviewContext.Provider value={contextValue}>
      {props.children}
    </InterviewContext.Provider>
  );
}
