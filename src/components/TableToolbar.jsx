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
import Slide from "@material-ui/core/Slide";
import useWindowSize from "../hooks/useWindowSize";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

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
        minHeight: 56,
        width: 80,
        '&:hover': {
            color: theme.palette.secondary.light,
            backgroundColor: theme.palette.primary.dark,
            border: '2px solid ' + theme.palette.secondary.main
        }
    },
    filterButtonActive: {
        color: theme.palette.secondary.light,
        backgroundColor: theme.palette.primary.dark,
        border: '2px solid ' + theme.palette.secondary.main,
        borderBottom: 'none',
        '&:hover': {
            borderBottom: 'none'
        }
    },
    closeButton: {
        color: theme.palette.secondary.main
    },
    paperFilter: {
        backgroundColor: theme.palette.primary.dark,
        width: 'calc(100% - 4px)',
        minHeight: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        '& > *': {
            marginTop: 0
        },
        border: '2px solid ' + theme.palette.secondary.main,
        [theme.breakpoints.down('md')]: {
            justifyContent: 'center',
            flexDirection: 'column',
            '& > *': {
                marginTop: 30
            },
        }
    },
    collapseContainer: {
        flexShrink: 0
    },
    actionsContainer: {
        marginLeft: 'auto',
        marginRight: 20,
        alignSelf: 'flex-end',
        marginBottom: 20,
        [theme.breakpoints.down('md')]: {
            alignSelf: 'center',
            '& > button': {
                marginLeft: 20
            },
            marginLeft: 0,
            marginRight: 0,
        }
    },
    dialogContainer: {
        '& .MuiDialog-paper': {
            overflowX: 'hidden',
            backgroundColor: theme.palette.primary.main,
            textAlign: 'center',
            '&:first-child': {
                color: theme.palette.secondary.light
            }
        }
    },
    rankFilter: {
        marginLeft: 40
    },
    daysFilter: {
        marginLeft: 40
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props}/>;
});

let days = null;
let ranks = null;
let search = null;

function TableToolbar(props) {
    const [width, height] = useWindowSize()
    const classes = useStyles();
    const [openFilter, setOpenFilter] = useState(false);


    const {handleApplyFilters} = props;

    const handleOpenFilter = (event) => {
        setOpenFilter(!openFilter)
    };

    const handleApply = () => {
        if (width <= 1400) {
            setOpenFilter(false)
        }
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
            {
                width > 1400 ? <Collapse in={Boolean(openFilter)} addEndListener={() => {
                    }} className={classes.collapseContainer}>
                        <Paper className={classes.paperFilter} square>
                            <DaysFilter handler={(newDays) => {
                                days = newDays
                            }} className={classes.daysFilter}/>
                            <RankFilter handler={(newRanks) => {
                                ranks = newRanks
                            }} className={classes.rankFilter}/>
                            <StyledButton variant={'contained'} className={classes.actionsContainer}
                                          onClick={handleApply}>Apply</StyledButton>
                        </Paper>
                    </Collapse>
                    :
                    <Dialog fullScreen={true} open={width <= 1400 && Boolean(openFilter)}
                            TransitionComponent={Transition} className={classes.dialogContainer}>
                        <Typography variant={'h5'}>Filters</Typography>
                        <Paper className={classes.paperFilter} square>
                            <DaysFilter handler={(newDays) => {
                                days = newDays
                            }}/>
                            <Divider/>
                            <RankFilter handler={(newRanks) => {
                                ranks = newRanks
                            }}/>
                            <Divider/>
                            <div className={classes.actionsContainer}>
                                <StyledButton variant={'contained'}
                                              onClick={handleApply}>Apply</StyledButton>
                                <StyledButton variant={'contained'}
                                              onClick={handleOpenFilter}>Close</StyledButton>
                            </div>
                        </Paper>
                    </Dialog>
            }

        </>
    )
}

export default TableToolbar;
