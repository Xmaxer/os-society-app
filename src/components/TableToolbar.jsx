import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {StyledTextField} from "../assets/styledComponents";
import DaysFilter from "./DaysFilter";
import FilterListIcon from '@material-ui/icons/FilterList';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    toolbar: {
        backgroundColor: theme.palette.primary.dark,
        justifyContent: 'flex-end',
        padding: 0
    },
    filterButton: {
        color: theme.palette.primary.dark,
        backgroundColor: theme.palette.secondary.main,
        marginLeft: 40,
        borderRadius: 0,
        minHeight: 64,
        width: 80,
        '&:hover': {
            backgroundColor: theme.palette.tertiary.main
        }
    },
    closeButton: {
        color: theme.palette.tertiary.main
    },
    paperFilter: {
        backgroundColor: theme.palette.primary.dark,
        width: '100%',
        minHeight: 80
    },
    collapseContainer: {
        flexShrink: 0
    }
}));

function TableToolbar(props) {
    const classes = useStyles();
    const [openFilter, setOpenFilter] = useState(false);

    const handleOpenFilter = (event) => {
        setOpenFilter(!openFilter)
    };


    return (<>
            <Toolbar className={classes.toolbar}>
                <StyledTextField placeholder={"search usernames"} InputProps={{startAdornment: <InputAdornment position={"start"}><SearchIcon/></InputAdornment>, endAdornment: <InputAdornment position={"end"}><IconButton className={classes.closeButton} disableRipple disableTouchRipple disableFocusRipple><CloseIcon/></IconButton></InputAdornment>}}/>
                <IconButton className={classes.filterButton} onClick={handleOpenFilter}>
                    <FilterListIcon/>
                </IconButton>
            </Toolbar>
            <Collapse in={Boolean(openFilter)} addEndListener={() => {}} className={classes.collapseContainer}>
                <Paper className={classes.paperFilter} square>
                    <DaysFilter/>
                </Paper>
            </Collapse>
        </>
    )
}

export default TableToolbar;
