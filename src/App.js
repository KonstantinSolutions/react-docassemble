import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import CurrentQuestion from "./ui/CurrentQuestion";
import { InterviewProvider } from "./context";

function App() {
  return (
    <InterviewProvider>
      <div className="App">
        <h1>React docassemble</h1>
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/session/question" component={CurrentQuestion} />
        </Router>
      </div>
    </InterviewProvider>
  );
}

export default App;
