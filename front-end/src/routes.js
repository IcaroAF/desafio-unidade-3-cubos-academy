import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { AuthContext } from "./components/context/AuthContext";

function Routes() {

  const [token, setToken] = useState('');

  console.log(token);

  return (
    <AuthContext.Provider value={{token, setToken}}>
      <Router>
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    </AuthContext.Provider>
    
  );
}

export default Routes;
