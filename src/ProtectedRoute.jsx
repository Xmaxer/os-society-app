import React, {Component, useEffect} from 'react';
import {Redirect, Route} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles';
import {LinearProgress} from '@material-ui/core';
import useApi from "./hooks/useApi";
import {IS_AUTHENTICATED_QUERY} from "./assets/queries";
import Header from "./components/Header";
import {CHANGE_PASSWORD_ROUTE, LOGIN_ROUTE} from "./assets/routes";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    }
}));

function ProtectedRoute({component: Component, ...rest}) {
    const classes = useStyles();
    const {data, handleCall} = useApi({query: IS_AUTHENTICATED_QUERY});

    useEffect(() => {
        handleCall()
    }, []);

    if (data === null || data.isAuthenticated === undefined) {
        return (<div style={{width: '100%'}}><LinearProgress color={"secondary"}/></div>)
    }

    return (
        <Route
            {...rest}
            render={props => {
                if (data && data.isAuthenticated && !data.isAuthenticated.resetPassword) {
                    return <div className={classes.root}>
                        <Header/>
                        <Component {...props} />
                    </div>;
                } else if (data && data.isAuthenticated && data.isAuthenticated.resetPassword) {
                    return <Redirect to={{pathname: CHANGE_PASSWORD_ROUTE, state: {user: data.isAuthenticated}}}/>
                } else {
                    return <Redirect to={{pathname: LOGIN_ROUTE, state: {from: props.location}}}/>
                }
            }}
        />
    );
}

export default ProtectedRoute;
