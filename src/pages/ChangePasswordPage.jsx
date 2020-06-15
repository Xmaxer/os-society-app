import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useHistory, useLocation} from "react-router-dom";
import useApi from "../hooks/useApi";
import {SET_PASSWORD_MUTATION} from "../assets/queries";
import {HOME_ROUTE} from "../assets/routes";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {Formik} from "formik";
import {StyledButton, StyledTextField} from "../assets/styledComponents";
import CircularProgress from "@material-ui/core/CircularProgress";

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
        color: theme.palette.secondary.main
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
        color: theme.palette.secondary.main
    },
    subText: {
        color: theme.palette.secondary.light
    }
}));

function ChangePasswordPage() {

    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    let user = location.state.user
    const {handleCall} = useApi({query: SET_PASSWORD_MUTATION});

    const handleSuccess = (data) => {
        if (data && data.user && data.user.user) {
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
                        {"Update Password"}
                    </Typography>
                    <Divider className={classes.divider}/>
                </Box>
                <Typography variant={'subtitle1'} className={classes.subText}>
                    {"Hey " + user.username + ", set your new password"}
                </Typography>
                <Formik initialValues={{password: ''}} onSubmit={(values, {setSubmitting}) => {
                    setSubmitting(true);
                    handleCall({
                        variables: {...values, id: user.id}, handleComplete: () => {
                            setSubmitting(false)
                        }, handleSuccess: handleSuccess
                    });
                }}>
                    {({values, handleChange, handleSubmit, isSubmitting}) => (
                        <form onSubmit={handleSubmit} className={classes.form}>
                            <StyledTextField label={"password"} type={'password'} value={values.password}
                                             onChange={handleChange} required name={"password"}/>
                            <StyledButton variant={'contained'} className={classes.loginButton} type={'submit'}
                                          disabled={isSubmitting}>{isSubmitting ? <CircularProgress size={"1.2rem"}
                                                                                                    className={classes.circularProgress}/> : "Set Password"}</StyledButton>
                        </form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
}

export default ChangePasswordPage;
