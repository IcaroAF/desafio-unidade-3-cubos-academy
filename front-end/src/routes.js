import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import SignUp from "./pages/SignUp";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/signup" component={SignUp} />
      </Switch>
    </Router>
  );
}

export default Routes;
