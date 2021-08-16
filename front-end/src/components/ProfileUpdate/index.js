import React, { useContext, useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core/';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import PasswordInput from '../PasswordInput';
import { formStyles } from '../../styles/formStyles';
import { AuthContext } from '../context/AuthContext';
import {ProfileContext} from '../context/ProfileContext'

function ProfileUpdate({ setRequestError, setLoading }) {
    const classes = formStyles();
    const history = useHistory();
    const { token } = useContext(AuthContext);
    // const [name, setName] = useState('')
    // const[mail, setMail] = useState('')
    // const [storeName, setStoreName] = useState('')
    const {name, storeName, mail} = useContext(ProfileContext);
    const { handleSubmit, register, formState: { errors }, setError } = useForm();

    async function updatingProfile(data) {
        if (data.senha !== data.confirmaSenha) {
            setError('senha', { type: "validate" }, { shouldFocus: true });
            setError('confirmaSenha', { type: "validate" }, { shouldFocus: false });
            return;
        }

        setRequestError('');
        setLoading(true);

        const response = await fetch('http://localhost:3000/perfil', {
            method: "PUT",
            mode: 'cors',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });

        setLoading(false);

        if (response.ok) {
            history.push('/perfil');
            return;
        }

        const userData = await response.json();
        setRequestError(userData);


    }

    return (
        <form className={classes.form} onSubmit={handleSubmit(updatingProfile)}>
            <Typography variant="h4" component="h2">Atualizar Perfil</Typography>
            <div className={classes.row}>
                <TextField
                    className={classes.input}
                    label="Seu Nome"
                    error={!!errors.nome}
                    inputProps={{defaultValue: name }}
                    {...register('nome', { required: false })}
                />
            </div>
            <div className={classes.row}>
                <TextField
                    className={classes.input}
                    label="Nome da Loja"
                    inputProps={{defaultValue: storeName }}
                    error={!!errors.nome_loja}
                    {...register('nome_loja', { required: false })}
                />
            </div>
            <div className={classes.row}>
                <TextField
                    className={classes.input}
                    label="E-mail"
                    inputProps={{defaultValue: mail }}
                    error={!!errors.email}
                    {...register('email', { required: false })}
                />
            </div>
            <div className={classes.row}>
                <PasswordInput
                    label="Senha"
                    id="senha-cadastro"
                    error={!!errors.senha}
                    register={() => register('senha', { required: false })}
                />
            </div>
            <div className={classes.row}>
                <PasswordInput
                    label="Confirme a Senha"
                    id="confirmaSenha"
                    error={!!errors.confirmaSenha}
                    register={() => register('confirmaSenha', { required: false })}
                />
            </div>
            <Button type="submit" className={classes.button} variant="contained" color="primary">
                Atualizar Perfil
            </Button>
        </form>
    );

};

export default ProfileUpdate;

