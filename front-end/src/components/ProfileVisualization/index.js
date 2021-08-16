import { Button, TextField, Typography } from '@material-ui/core';
import React, {useContext, useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../components/context/AuthContext';
import { formStyles } from '../../styles/formStyles';
import useGet from '../../Hooks/useGet';
import { ProfileContext } from '../context/ProfileContext';

function ProfileVisualization(){
    const classes = formStyles();
    const history = useHistory();
    const {getProfile} = useGet();
    const {name, storeName, mail} = useContext(ProfileContext);

    useEffect(()=> {
        getProfile();
    }, []);
    
    return(
        <form>
            <header>
               <Typography variant="h4" component="h2">{storeName || ''}</Typography>
            </header>
            <main>
                <Typography variant="h4" component="h3">Perfil</Typography>
                <hr/>
                <div >
                <TextField disabled
                    className={classes.input}
                    label="Seu Nome"
                    value={name || ''}
                />
            </div>
            <div >
                <TextField disabled
                    className={classes.input}
                    label="Nome da Loja"
                    value={storeName || ''}
                />
            </div>
            <div >
                <TextField disabled
                    className={classes.input}
                    label="E-mail"
                    value={mail || ''}
                />
            </div>
            <Button className={classes.button} variant="contained" color="primary" onClick={()=>history.push('/perfil/editar')}>
                Editar Perfil
            </Button>
            </main>
        </form>
        
    );
}

export default ProfileVisualization;