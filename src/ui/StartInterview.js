import React from "react";
import { withRouter } from "react-router-dom";

function StartInterview({ filename, title, history }) {
  function startInterview() {
    fetch(`/api/session/new?i=${filename}`, {
      headers: {
        "x-api-key": "VAMQXTCK06465LP8B6C31TIOFZB8ZNRI"
      }
    }).then(() => {
      history.push("/interview/page1");
    });
  }
  return <button onClick={startInterview}>{title}</button>;
}

export default withRouter(StartInterview);
