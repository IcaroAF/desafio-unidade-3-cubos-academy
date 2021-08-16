import React, { useContext } from 'react';
import { Button, TextField, Typography } from '@material-ui/core/';
import { useForm } from 'react-hook-form';
import { useHistory, Link } from 'react-router-dom';
import PasswordInput from '../PasswordInput';
import { formStyles } from '../../styles/formStyles';
import { AuthContext } from '../context/AuthContext';
import useGet from '../../Hooks/useGet';


function LoginForm({ setRequestError, setLoading }) {
    const classes = formStyles();
    const history = useHistory();
    const { setToken } = useContext(AuthContext);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const {getProfile} = useGet();

    async function login(data) {

        setRequestError('');
        setLoading(true);

        const response = await fetch('http://localhost:3000/login', {
            method: "POST",
            mode: 'cors',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json',
            }
        });

        setLoading(false);

        

        const userData = await response.json();

        if (response.ok) {
            setToken(userData.token);
            localStorage.setItem('token', userData.token);
            getProfile();
            history.push('/produtos');
            return;
        }

        setRequestError(userData);


    }

    return (
        <form className={classes.form} onSubmit={handleSubmit(login)}>
            <Typography variant="h4" component="h2">Login</Typography>
            <div className={classes.row}>
                <TextField
                    className={classes.input}
                    label="E-mail"
                    error={!!errors.email}
                    {...register('email', { required: true })}
                />
            </div>
            <div className={classes.row}>
                <PasswordInput
                    label="Senha"
                    id="senha-cadastro"
                    error={!!errors.senha}
                    register={() => register('senha', { required: true })}
                />
            </div>
            <Button type="submit" className={classes.button} variant="contained" color="primary">
                Entrar
            </Button>
            <p>
                Ainda não possui cadastro?
                <Link to="/cadastrar">Cria uma conta</Link>
            </p>
        </form>
    );

};

export default LoginForm;