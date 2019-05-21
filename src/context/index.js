import React from "react";
import useLocalStorage from "react-use-localstorage";

export const InterviewContext = React.createContext({});

export function InterviewProvider(props) {
  const [session, setSession] = useLocalStorage("session", null);
  const [i, setFilename] = useLocalStorage("filename", null);
  return (
    <InterviewContext.Provider value={{ session, setSession, i, setFilename }}>
      {props.children}
    </InterviewContext.Provider>
  );
}
