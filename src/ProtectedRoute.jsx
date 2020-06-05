import React, {Component, useEffect} from 'react';
import {Redirect, Route} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles';
import {LinearProgress} from '@material-ui/core';
import useAuthenticatedMutation from "./hooks/useAuthenticatedMutation";
import {IS_AUTHENTICATED_QUERY} from "./assets/queries";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: '100%'
    }
}));

function ProtectedRoute({component: Component, ...rest}) {
    const classes = useStyles();
    const {data, handleMutation} = useAuthenticatedMutation({query: IS_AUTHENTICATED_QUERY});

    useEffect(() => {
        handleMutation()
    }, []);

    if (data === null || data.isAuthenticated === null) {
        return (<div style={{width: '100%'}}><LinearProgress color={"secondary"}/></div>)
    }

    return (
        <Route
            {...rest}
            render={props => {
                if (data && data.isAuthenticated) {
                    return <div className={classes.root}>
                        <Component {...props} />
                    </div>;
                } else {
                    return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
                }
            }}
        />
    );
}

export default ProtectedRoute;
