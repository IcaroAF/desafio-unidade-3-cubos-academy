import { useContext } from 'react'
import { ProfileContext } from '../components/context/ProfileContext';
import { AuthContext } from '../components/context/AuthContext';

function useGet() {
  const { setName, setStoreName, setMail } = useContext(ProfileContext);
  const {token } = useContext(AuthContext);


    async function getProfile(){
        const response = await fetch('http://localhost:3000/perfil', {
        method: "GET",
        mode: 'cors',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
        const userData = await response.json();
        setName(userData.nome);
        setStoreName(userData.nome_loja);
        setMail(userData.email);
        localStorage.setItem('nome', userData.nome);
        localStorage.setItem('nome_loja', userData.nome_loja); 
        localStorage.setItem('email', userData.email);     
    }
  
  

  return {getProfile}
}

export default useGet;