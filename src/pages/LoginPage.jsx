import React from 'react';
import {useHistory} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import {Formik} from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';
import useApi from "../hooks/useApi";
import {LOGIN_MUTATION} from "../assets/queries";
import {HOME_ROUTE} from "../assets/routes";
import {StyledButton, StyledTextField} from "../assets/styledComponents";

const useStyles = makeStyles(theme => ({
    background: {
        backgroundColor: theme.palette.secondary.main,
        width: '100%',
        height: '100%',
        margin: '0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    loginBox: {
        borderRadius: 10,
        minWidth: 200,
        minHeight: 300,
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 30,
        position: 'relative'
    },
    title: {
        color: theme.palette.tertiary.main
    },
    divider: {
        width: '100%',
    },
    titleBox: {
        width: '100%',
        height: '70px',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        top: 0,
        bottom: 0,
        flexDirection: 'column',
        marginTop: 20
    },
    image: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        alignSelf: 'center',
        marginTop: 20
    },
    loginButton: {
        position: 'absolute',
        bottom: 0,
        marginBottom: 20,
        width: 'calc(100% - 60px)'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        '& > *': {
            marginTop: 20
        },
    },
    circularProgress: {
        color: theme.palette.tertiary.main
    }
}));

function LoginPage() {
    const classes = useStyles();
    const history = useHistory();

    const {handleCall} = useApi({query: LOGIN_MUTATION});

    const handleSuccess = (data) => {
        if (data && data.login && data.login.token) {
            localStorage.setItem('access_token', data.login.token);
            history.push({
                pathname: HOME_ROUTE
            })
        }
    };

    return (
        <Box className={classes.background}>
            <img src={'/images/oss-logo-large.png'} alt={"OSS Logo"} className={classes.image}/>
            <Box className={classes.loginBox}>
                <Box className={classes.titleBox}>
                    <Typography variant={'h5'} className={classes.title}>
                        Login
                    </Typography>
                    <Divider className={classes.divider}/>
                </Box>
                <Formik initialValues={{username: '', password: ''}} onSubmit={(values, {setSubmitting}) => {
                    setSubmitting(true);
                    handleCall({variables: {...values}, handleComplete: () => {
                            setSubmitting(false)
                        }, handleSuccess: handleSuccess});
                }}>
                    {({values, handleChange, handleSubmit, isSubmitting}) => (
                        <form onSubmit={handleSubmit} className={classes.form}>
                            <StyledTextField label={"Username"} value={values.username} onChange={handleChange} required
                                       name={"username"} spellCheck={false}/>
                            <StyledTextField label={"password"} type={'password'} value={values.password}
                                       onChange={handleChange} required name={"password"}/>
                            <StyledButton variant={'contained'} className={classes.loginButton} type={'submit'}
                                    disabled={isSubmitting}>{isSubmitting ? <CircularProgress size={"1.2rem"}
                                                                                              className={classes.circularProgress}/> : "Login"}</StyledButton>
                        </form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
}

export default LoginPage;
