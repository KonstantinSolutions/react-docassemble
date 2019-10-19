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
  const [defaultVars, setDefaultVars] = useState({});
  const [globalError, setGlobalError] = useState(null);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [debug, setDebug] = useState(false);
  const host = (props.config && props.config.host) || "";

  function debugLog(...params) {
    if (debug) console.log('[react-docassemble]', ...params);
  }

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
    debugLog('got errors = ', errors);
    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      return false;
    }
    return true;
  }

  function fetchQuestion() {
    setLoadingQuestion(true);
    const queryString = qs.stringify({ ...defaultVars, session });
    return get(`${host}/api/session/question?${queryString}`)
      .then(data => {
        debugLog('setting question = ', data);
        setQuestion(data);
      })
      .finally(() => {
        setLoadingQuestion(false);
      });
  }

  function fetchVariables({ session }) {
    const queryString = qs.stringify({ ...defaultVars, session });
    return get(`${host}/api/session?${queryString}`).then(data => {
      setVariables(data);
    });
  }

  function startInterview({ i, extraQueryParams, onStart }) {
    resetInterview();
    const queryString = qs.stringify({ ...defaultVars, i, ...extraQueryParams });
    return get(`${host}/api/session/new?${queryString}`).then(data => {
      const session = data && data.session;
      if (session) {
        debugLog('Got session = ', session);
        setSession(session);
        onStart && onStart(data);
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
    return post(`${host}/api/session/back`, { ...defaultVars, session }).then(data => {
      debugLog('Going back = ', data);
      setQuestion(data);
    });
  }

  function saveVariables() {
    if (!isValid()) {
      debugLog('Variables not valid.')
      return;
    }
    setLoadingQuestion(true);
    return post(`${host}/api/session`, {
      ...defaultVars,
      session,
      variables: filterVariablesByQuestion(question, variables)
    })
      .then(data => {
        debugLog('Saved variables = ', data);
        setQuestion(data);
      })
      .finally(() => {
        setLoadingQuestion(false);
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
    setDebug,
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
