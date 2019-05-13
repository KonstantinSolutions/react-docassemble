import React from "react";
import { withRouter } from "react-router-dom";

function Exit({ exit_label, exit_link, history }) {
  return (
    <button className="btn btn-danger" onClick={() => history.push(exit_link)}>
      {exit_label}
    </button>
  );
}

export default withRouter(Exit);
