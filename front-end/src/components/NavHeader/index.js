import React, { useContext, useEffect } from 'react';
import {Link, 
    useHistory} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './styles.css';
import { ProfileContext } from '../context/ProfileContext';


function NavHeader(props){

    const history = useHistory();
    const { setToken } = useContext(AuthContext);
    const { storeName } = useContext(ProfileContext);
  
    function handleLogout(e){
      e.preventDefault();
      setToken('')
      localStorage.removeItem('token');
      localStorage.removeItem('nome');
      localStorage.removeItem('nome_loja');
      localStorage.removeItem('email');
      history.push('/');
      return;
  }
  
  
    return(
      <div className="logged-layout">
        <nav>
          <Link to="/produtos">produtos</Link>
          <Link to="/perfil">perfil</Link>
          <Link to ="/" onClick={(e)=>handleLogout(e)}>sair</Link>
        </nav>
        <div className="content">
          <h1>{storeName}</h1>
          {props.children}
        </div>   
      </div>
    );
  }


export default NavHeader;