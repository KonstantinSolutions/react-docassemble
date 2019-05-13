import React, { useContext, useState, useEffect } from "react";
import { InterviewContext } from "../context";
import Exit from "./Exit";

export default function CurrentQuestion(props) {
  const { session, i } = useContext(InterviewContext);
  const [question, setQuestion] = useState();

  function fetchQuestion() {
    fetch(`/docassemble/api/session/question?i=${i}&session=${session}`)
      .then(res => res.json())
      .then(data => {
        setQuestion(data);
      });
  }

  useEffect(() => {
    fetchQuestion();
  }, []);

  if (!question) {
    return null;
  }
  const { questionText, fields, exit_label, exit_link } = question;
  console.log(question);
  return (
    <div>
      <h1>{questionText}</h1>
      {exit_label ? (
        <Exit exit_label={exit_label} exit_link={exit_link} />
      ) : null}
    </div>
  );
}
