import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// components
import Join from "./components/Join";
import Chat from "./components/Chat";

const App = () => {
  return (
    <Router>
      <Route path="/chat" component={Chat} />
      <Route path="/" exact component={Join} />
    </Router>
  );
};

export default App;
