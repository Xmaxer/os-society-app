import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import UsersTable from "../components/UsersTable";

const useStyles = makeStyles(theme => ({}));

function HomePage() {
    return (
        <UsersTable/>
    );
}

export default HomePage;
