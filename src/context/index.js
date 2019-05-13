import React, { useState } from "react";

export const InterviewContext = React.createContext({});

export function InterviewProvider(props) {
  const [session, setSession] = useState();
  return (
    <InterviewContext.Provider value={{ session, setSession }}>
      {props.children}
    </InterviewContext.Provider>
  );
}
