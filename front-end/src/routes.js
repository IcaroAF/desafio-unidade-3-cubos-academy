import React, { useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect,
  Switch,
  useHistory
} from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";
import Products from "./pages/Products";
import { AuthContext } from "./components/context/AuthContext";
import NavHeader from './components/NavHeader';
import { ProfileContext } from "./components/context/ProfileContext";


function SecuredRoutes({children}){
  const {token} = useContext(AuthContext);

  return(
    <Route render={() => (token ? children : <Redirect to="/" />)} />
  )
}

function Routes() {

  const [token, setToken] = useState(()=>{
    const token = localStorage.getItem("token");
    return token;
    });

  const [name, setName] = useState(()=>{
    const name = localStorage.getItem("nome")
    return name;
  });

  const[mail, setMail] = useState(()=>{
    const mail = localStorage.getItem("email")
    return mail;
  });

  const [storeName, setStoreName] = useState(()=>{
    const storeName = localStorage.getItem("nome_loja")
    return storeName;
  }); 

  return (
    <AuthContext.Provider value={{token, setToken}}>
      <ProfileContext.Provider value={{name, setName, mail, setMail, storeName, setStoreName}}>
        <Router>
            <Route path="/" exact component={Login} />
          <Route path="/cadastrar" component={SignUp} />
          <SecuredRoutes>
            <NavHeader>
            <Switch>
              <Route path="/perfil/editar" component={UpdateProfile}/>
              <Route path="/perfil" component={Profile}/>
              <Route path="/produtos" component={Products}/>     
              </Switch>
            </NavHeader> 
          </SecuredRoutes>
        </Router>
      </ProfileContext.Provider>
    </AuthContext.Provider>
    
  );
}

export default Routes;
