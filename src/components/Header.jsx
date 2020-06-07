import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {StyledButton} from "../assets/styledComponents";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    appbar: {
        height: 80,
    },
    logo: {
        height: '100%',
        marginLeft: 'auto'
    },
    logoutButton: {
        marginLeft: 'auto',
        marginRight: 20
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

function Header() {
    const classes = useStyles();

    return (
        <AppBar position={'static'} className={classes.appbar}>
            <Toolbar className={classes.toolbar}>
                <img src={"/images/oss-logo-large.png"} alt={"OSS Logo"} className={classes.logo}/>
                <StyledButton className={classes.logoutButton}>Logout</StyledButton>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
