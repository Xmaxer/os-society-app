import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TableToolbar from "./TableToolbar";
import PlayerTable from "./PlayerTable";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: 'calc(100% - 80px)',
        overflow: 'hidden'
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    }
}));

function UsersTable() {
    const classes = useStyles();
    const [days, setDays] = useState(null);
    const [ranks, setRanks] = useState(null);
    const [search, setSearch] = useState(null);

    const handleApplyFilters = (days, ranks, search) => {
        console.log(days);
        console.log(ranks);
        console.log(search);
        setDays(days);
        setRanks(ranks);
        setSearch(search);
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} square>
                <TableToolbar handleApplyFilters={handleApplyFilters}/>
                <PlayerTable days={days} ranks={ranks} search={search}/>
            </Paper>
        </div>

    );
}

export default UsersTable;
