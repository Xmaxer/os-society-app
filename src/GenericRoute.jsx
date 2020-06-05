import React, {Component} from 'react';
import {Route} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({}));

function GenericRoute({component: Component, ...rest}) {
    const classes = useStyles();

    return (
        <Route
            {...rest}
            render={props => {
                return <div className={classes.root}>
                    <Component {...props} />
                </div>;
            }}
        />
    );
}

export default GenericRoute;
