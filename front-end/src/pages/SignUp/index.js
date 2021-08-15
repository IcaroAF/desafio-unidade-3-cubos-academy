import { Backdrop, Card, CircularProgress, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';
import SignUpForm from '../../components/SignUpForm';
import './styles.css';

const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: "#FFFFFF",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 16,
        boxShadow: "0px 8px 9px -5px rgba(0, 0, 0, 0.2), 0px 15px 22px 2px rgba(0, 0, 0, 0.14), 0px 6px 28px 5px rgba(0, 0, 0, 0.12)",
        padding: "80px 86px 89px 86px",
        "& h2": {
            textAlign: "center",
            marginBottom: 55
        }
    },
    row: {
        display: "flex",
        gap: 40,
        marginBottom: 48
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    input: {
        width: 220
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));

function SignUp() {

    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [requestError, setRequestError] = useState('');


    function handleOnAlertClose() {
        setRequestError('');
    }

    return (
        <div className="signup-container">
            <Card className={classes.card}>
                <SignUpForm setRequestError={setRequestError} setLoading={setLoading} />
            </Card>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar open={!!requestError} autoHideDuration={6000} onClose={handleOnAlertClose}>
                <Alert severity="error" onClose={handleOnAlertClose}>
                    {requestError}
                </Alert>
            </Snackbar>
        </div>
    );
}


export default SignUp;