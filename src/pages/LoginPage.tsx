import React from 'react';
import {useHistory} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {Formik} from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';
import useApi from "../hooks/useApi";
import {ILoginMutationData, ILoginMutationVariables, LOGIN_MUTATION} from "../assets/api/queries";
import {CHANGE_PASSWORD_ROUTE, HOME_ROUTE} from "../assets/constants/routes";
import {StyledButton, StyledTextField} from "../assets/theme/styledComponents";

const useStyles = makeStyles(theme => ({
    background: {
        backgroundColor: theme.palette.primary.dark,
        width: '100%',
        height: '100%',
        margin: '0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    loginBox: {
        borderRadius: 10,
        borderColor: theme.palette.secondary.light,
        borderWidth: 1,
        borderStyle: 'solid',
        minWidth: 300,
        minHeight: 400,
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative'
    },
    title: {
        color: theme.palette.secondary.main
    },
    divider: {
        width: '100%',
    },
    titleBox: {
        width: '100%',
        height: '70px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
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
        width: '100%',
        height: 50,
        borderStyle: "solid none solid none",
        marginTop: 'auto !important',
        borderRadius: "0px 0px 10px 10px"
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
        height: '100%',
        width: '100%'
    },
    circularProgress: {
        color: theme.palette.secondary.main
    }
}));

function LoginPage() {
    const classes = useStyles();
    const history = useHistory();

    const {request} = useApi<ILoginMutationData, ILoginMutationVariables>({query: LOGIN_MUTATION});

    const handleSuccess = (data: ILoginMutationData) => {
        if (data && data.login && data.login.token && data.login.user) {

            localStorage.setItem('access_token', data.login.token);

            if (data.login.user.resetPassword) {
                history.push({pathname: CHANGE_PASSWORD_ROUTE, state: {user: data.login.user}})
            } else {
                history.push({
                    pathname: HOME_ROUTE
                })
            }
        }
    };

    return (
        <div className={classes.background}>
            <img src={'/images/oss-logo-large.png'} alt={"OSS Logo"} className={classes.image}/>
            <div className={classes.loginBox}>
                <div className={classes.titleBox}>
                    <Typography variant={'h5'} className={classes.title}>
                        Login
                    </Typography>
                    <Divider className={classes.divider}/>
                </div>
                <Formik initialValues={{username: '', password: ''}} onSubmit={(values, {setSubmitting}) => {
                    setSubmitting(true);
                    request({
                        variables: {...values}, handleComplete: () => {
                            setSubmitting(false)
                        }, handleSuccess: handleSuccess
                    });
                }}>
                    {({values, handleChange, handleSubmit, isSubmitting}) => (
                        <form onSubmit={handleSubmit} className={classes.form}>
                            <StyledTextField label={"Username"} value={values.username} onChange={handleChange} required
                                             name={"username"} spellCheck={false}/>
                            <StyledTextField label={"password"} type={'password'} value={values.password}
                                             onChange={handleChange} required name={"password"}/>
                            <StyledButton variant={'outlined'} className={classes.loginButton} type={'submit'}
                                          disabled={isSubmitting}>{isSubmitting ? <CircularProgress size={"1.2rem"}
                                                                                                    className={classes.circularProgress}/> : "Login"}</StyledButton>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default LoginPage;
