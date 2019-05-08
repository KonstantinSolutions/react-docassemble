import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Interview from "./ui/Interview";

function App() {
  return (
    <div className="App">
      <h1>React docassemble</h1>
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/interview/:page" component={Interview} />
      </Router>
    </div>
  );
}

export default App;
