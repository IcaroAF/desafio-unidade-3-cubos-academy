import React from 'react';
import { Button, TextField, Typography } from '@material-ui/core/';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import PasswordInput from '../PasswordInput';
import { formStyles } from '../../styles/formStyles';

function SignUpForm({ setRequestError, setLoading }) {
    const classes = formStyles();
    const history = useHistory();
    const { handleSubmit, register, formState: { errors }, setError } = useForm();

    async function signup(data) {
        if (data.senha !== data.confirmaSenha) {
            setError('senha', { type: "validate" }, { shouldFocus: true });
            setError('confirmaSenha', { type: "validate" }, { shouldFocus: false });
            return;
        }

        console.log(data);

        setRequestError('');
        setLoading(true);

        const response = await fetch('http://localhost:3000/usuarios', {
            method: "POST",
            mode: 'cors',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json',
            }
        });

        setLoading(false);

        if (response.ok) {
            history.push('/');
            return;
        }

        const userData = await response.json();
        setRequestError(userData);


    }

    return (
        <form className={classes.form} onSubmit={handleSubmit(signup)}>
            <Typography variant="h4" component="h2">Criar uma conta</Typography>
            <div className={classes.row}>
                <TextField
                    className={classes.input}
                    label="Seu Nome"
                    error={!!errors.nome}
                    {...register('nome', { required: true })}
                />
            </div>
            <div className={classes.row}>
                <TextField
                    className={classes.input}
                    label="Nome da Loja"
                    error={!!errors.nome_loja}
                    {...register('nome_loja', { required: true })}
                />
            </div>
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
            <div className={classes.row}>
                <PasswordInput
                    label="Confirme a Senha"
                    id="confirmaSenha"
                    error={!!errors.confirmaSenha}
                    register={() => register('confirmaSenha', { required: true })}
                />
            </div>
            <Button type="submit" className={classes.button} variant="contained" color="primary">
                Criar Conta
            </Button>
            <p>
                Já possui uma conta?
                <a href="/">ACESSE</a>
            </p>
        </form>
    );

};

export default SignUpForm;

