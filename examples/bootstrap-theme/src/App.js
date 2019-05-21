import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import CurrentQuestion from "./ui/CurrentQuestion";
import { InterviewProvider } from "react-docassemble";

function App() {
  return (
    <InterviewProvider>
      <div className="App">
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/session/question" component={CurrentQuestion} />
        </Router>
      </div>
    </InterviewProvider>
  );
}

export default App;
