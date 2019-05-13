import React, { useState } from "react";

export const InterviewContext = React.createContext({});

export function InterviewProvider(props) {
  const [session, setSession] = useState();
  const [i, setFilename] = useState();
  return (
    <InterviewContext.Provider value={{ session, setSession, i, setFilename }}>
      {props.children}
    </InterviewContext.Provider>
  );
}
