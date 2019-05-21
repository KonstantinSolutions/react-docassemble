import React from "react";
import { StartInterview } from "react-docassemble";

export default function Interview({ history }) {
  return (
    <StartInterview
      filename="docassemble.playground1:test.yml"
      title="Start Interview"
      onStart={() => history.push("/session/question")}
    />
  );
}
