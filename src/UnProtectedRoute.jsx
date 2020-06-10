import React, {Component, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Redirect, Route} from 'react-router-dom'
import {LinearProgress} from '@material-ui/core';
import useApi from "./hooks/useApi";
import {IS_AUTHENTICATED_QUERY} from "./assets/queries";

const useStyles = makeStyles(theme => ({}));

function UnProtectedRoute({component: Component, ...rest}) {

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
                if (data && !data.isAuthenticated) {
                    return <Component {...props} />;
                } else {
                    return <Redirect to={{pathname: '/'}}/>
                }
            }}
        />
    );
}

export default UnProtectedRoute;
