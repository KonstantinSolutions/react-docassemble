import React, {useState, useEffect, useRef} from 'react';
import useLocalStorage from 'react-use-localstorage';
import {get, post} from '../api';
import {validate} from '../helpers';

export const InterviewContext = React.createContext({});

export function InterviewProvider(props) {
  const [session, setSession] = useState(null);
  const [i, setFilename] = useState(null);
  const [question, setQuestion] = useState();
  const [variables, setVariables] = useState({});
  const [errors, setErrors] = useState({});

  function resetInterview() {
    setSession(undefined);
    setFilename(undefined);
    setQuestion(undefined);
    setErrors({});
    setVariables({});
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
    resetInterview();
    return get(`/docassemble/api/session/new?i=${i}`).then(data => {
      const session = data && data.session;
      if (session) {
        setSession(session);
        setFilename(i);
        onStart && onStart();
      } else {
        throw new Error('Interview session is null');
      }
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
      try {
        fetchQuestion();
      } catch (e) {}
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
    resetInterview,
    goBack,
    saveVariables
  };

  return (
    <InterviewContext.Provider value={contextValue}>
      {props.children}
    </InterviewContext.Provider>
  );
}
