import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { InterviewContext } from "../context";

function StartInterview({ filename, title, history }) {
  const { setSession, setFilename } = useContext(InterviewContext);
  function startInterview() {
    fetch(`/docassemble/api/session/new?i=${filename}`)
      .then(res => res.json())
      .then(data => {
        setSession(data.session);
        setFilename(filename);
        history.push("/session/question");
      });
  }
  return <button onClick={startInterview}>{title}</button>;
}

export default withRouter(StartInterview);
