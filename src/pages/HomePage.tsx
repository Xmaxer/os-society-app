import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import UsersTable from "../components/UsersTable";
import Header from "../components/Header";

const useStyles = makeStyles(theme => ({}));

function HomePage() {
    return (
        <>
            <Header/>
            <UsersTable/>
        </>
    );
}

export default HomePage;
