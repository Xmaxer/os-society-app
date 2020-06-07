import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {StyledButton} from "../assets/styledComponents";
import DaysFilter from "./DaysFilter";
import FilterListIcon from '@material-ui/icons/FilterList';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import RankFilter from "./RankFilter";
import SearchField from "./SearchField";

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
            color: theme.palette.secondary.light,
            backgroundColor: theme.palette.primary.dark,
            border: '2px solid ' + theme.palette.tertiary.main
        }
    },
    filterButtonActive: {
        color: theme.palette.secondary.light,
        backgroundColor: theme.palette.primary.dark,
        border: '2px solid ' + theme.palette.tertiary.main,
        borderBottom: 'none',
        '&:hover': {
            color: theme.palette.secondary.light,
            backgroundColor: theme.palette.primary.dark,
            border: '2px solid ' + theme.palette.tertiary.main,
            borderBottom: 'none'
        }
    },
    closeButton: {
        color: theme.palette.tertiary.main
    },
    paperFilter: {
        backgroundColor: theme.palette.primary.dark,
        width: '100%',
        minHeight: 100,
        display: 'flex',
        justifyContent: 'flex-start',
        '& > *': {
            marginLeft: 40,
            marginTop: 15
        },
        border: '2px solid ' + theme.palette.tertiary.main,
    },
    collapseContainer: {
        flexShrink: 0
    },
    apply: {
        marginLeft: 'auto',
        marginRight: 20,
        alignSelf: 'flex-end',
        marginBottom: 20,
    }
}));

let days = null;
let ranks = null;
let search = null;

function TableToolbar(props) {
    const classes = useStyles();
    const [openFilter, setOpenFilter] = useState(false);


    const {handleApplyFilters} = props;

    const handleOpenFilter = (event) => {
        setOpenFilter(!openFilter)
    };

    const handleApply = () => {
        handleApplyFilters(days, ranks, search);
    };

    const handleSearch = (newValue) => {
        search = newValue;
        handleApply();
    };

    return (<>
            <Toolbar className={classes.toolbar}>
                <SearchField handler={handleSearch}/>
                <IconButton
                    className={openFilter ? clsx(classes.filterButton, classes.filterButtonActive) : classes.filterButton}
                    onClick={handleOpenFilter}>
                    {
                        openFilter ? <CloseIcon/> : <FilterListIcon/>
                    }
                </IconButton>
            </Toolbar>
            <Collapse in={Boolean(openFilter)} addEndListener={() => {
            }} className={classes.collapseContainer}>
                <Paper className={classes.paperFilter} square>
                    <DaysFilter handler={(newDays) => {
                        days = newDays
                    }}/>
                    <RankFilter handler={(newRanks) => {
                        ranks = newRanks
                    }}/>
                    <StyledButton variant={'contained'} className={classes.apply}
                                  onClick={handleApply}>Apply</StyledButton>
                </Paper>
            </Collapse>
        </>
    )
}

export default TableToolbar;
