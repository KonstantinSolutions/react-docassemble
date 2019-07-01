import React, { useState, useEffect, useRef } from "react";
import qs from "qs";
import useLocalStorage from "react-use-localstorage";
import { get, post } from "../api";
import { validate, filterVariablesByQuestion } from "../helpers";

export const InterviewContext = React.createContext({});

export function InterviewProvider(props) {
  const [session, setSession] = useState(null);
  const [question, setQuestion] = useState();
  const [variables, setVariables] = useState({});
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState(null);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const host = props.config && props.config.host;

  function resetInterview() {
    setSession(undefined);
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
    setLoadingQuestion(true);
    return get(`${host}/api/session/question?&session=${session}`).then(
      data => {
        setLoadingQuestion(false);
        setQuestion(data);
      }
    );
  }

  function fetchVariables({ session }) {
    return get(`${host}/api/session?&session=${session}`).then(data => {
      setVariables(data);
    });
  }

  function startInterview({ i, extraQueryParams, onStart }) {
    resetInterview();
    const queryString = qs.stringify({ i, ...extraQueryParams });
    return get(`${host}/api/session/new?${queryString}`).then(data => {
      const session = data && data.session;
      if (session) {
        setSession(session);
        onStart && onStart();
      } else {
        throw new Error("Interview session is null");
      }
    });
  }

  function continueInterview({ session }) {
    resetInterview();
    if (!session) {
      throw new Error("Need session id to continue interview");
    }
    setSession(session);
    return fetchVariables({ session });
  }

  function goBack() {
    return post(`${host}/api/session/back`, { session }).then(data => {
      setQuestion(data);
    });
  }

  function saveVariables() {
    if (!isValid()) {
      return;
    }
    setLoadingQuestion(true);
    return post(`${host}/api/session`, {
      session,
      variables: filterVariablesByQuestion(question, variables)
    }).then(data => {
      setLoadingQuestion(false);
      setQuestion(data);
    });
  }

  useEffect(() => {
    if (session) {
      fetchQuestion().catch(e => setGlobalError("Fetching question failed"));
    }
  }, [session]);

  const contextValue = {
    session,
    question,
    variables,
    errors,
    globalError,
    setSession,
    setQuestion,
    setVariable,
    setVariables,
    fetchVariables,
    setErrors,
    startInterview,
    continueInterview,
    resetInterview,
    goBack,
    saveVariables,
    loadingQuestion,
    config: props.config
  };

  return (
    <InterviewContext.Provider value={contextValue}>
      {props.children}
    </InterviewContext.Provider>
  );
}
