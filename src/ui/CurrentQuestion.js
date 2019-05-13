import React, { useContext } from "react";
import { InterviewContext } from "../context";

export default function CurrentQuestion(props) {
  const { session } = useContext(InterviewContext);
  return <div>Interview page {session}</div>;
}
