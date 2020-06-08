import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {StyledButton} from "../assets/styledComponents";
import useApi from "../hooks/useApi";
import {LOGOUT_MUTATION} from "../assets/queries";
import {useHistory} from "react-router-dom"
import {LOGIN_ROUTE} from "../assets/routes";

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
    const history = useHistory();
    const {handleCall} = useApi({query: LOGOUT_MUTATION});

    const handleLogout = (event) => {
        handleCall({handleSuccess: handleSuccess});
    };

    const handleSuccess = (data) => {
        if (data && data.logout && data.logout.success)
            history.push(LOGIN_ROUTE)
    };

    return (
        <AppBar position={'static'} className={classes.appbar}>
            <Toolbar className={classes.toolbar}>
                <img src={"/images/oss-logo-large.png"} alt={"OSS Logo"} className={classes.logo}/>
                <StyledButton className={classes.logoutButton} onClick={handleLogout}>Logout</StyledButton>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
