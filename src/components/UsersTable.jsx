import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import useApi from "../hooks/useApi";
import {PLAYERS_QUERY} from "../assets/queries";
import parseISO from 'date-fns/parseISO'
import format from 'date-fns/format'
import differenceInDays from 'date-fns/differenceInDays'
import Collapse from '@material-ui/core/Collapse';
import {
    ORDER_ASC,
    ORDER_BY_CREATED_AT,
    ORDER_BY_JOIN_DATE, ORDER_BY_NUMBER_OF_DAYS,
    ORDER_BY_RANK, ORDER_BY_UPDATED_AT,
    ORDER_BY_USERNAME,
    ORDER_DESC
} from "../assets/filters";
import {StyledSlider, StyledTextField} from "../assets/styledComponents";
import FilterListIcon from '@material-ui/icons/FilterList';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Skeleton from '@material-ui/lab/Skeleton';
import DaysFilter from "./DaysFilter";
import TableToolbar from "./TableToolbar";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: 'calc(100% - 80px)',
        overflowY: 'hidden'
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
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
    paginationRoot: {
        flexShrink: 0,
        marginLeft: 20,
        '& button': {
            color: theme.palette.secondary.light,
            '&:hover': {
                color: theme.palette.tertiary.main,
            },
            '&:focus': {
                color: theme.palette.tertiary.main,
            }
        }
    },
    table: {
        minWidth: 500
    },
    thead: {
        '& th': {
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.light,
            '& .MuiTableSortLabel-active': {
                color: theme.palette.tertiary.main
            },
            borderColor: theme.palette.tertiary.main
        }
    },
    tableContainer: {
        overflowY: 'auto',
        borderRadius: 0
    },
    sortLabel: {
        '&:hover': {
            color: theme.palette.tertiary.main
        },
        '&:focus': {
            color: theme.palette.tertiary.main
        }
    },
    sortLabelActive: {
        color: theme.palette.tertiary.main + ' !important'
    },
    tableBody: {
        '& td': {
            color: theme.palette.secondary.light,
            borderColor: theme.palette.tertiary.main
        },

        '& > :nth-of-type(odd)': {
            backgroundColor: theme.palette.primary.dark
        },
        '& > :nth-of-type(even)': {
            backgroundColor: theme.palette.primary.main
        }
    },
    tableFooter: {
        '& td': {
            position: 'sticky',
            bottom: 0,
            backgroundColor: theme.palette.primary.main,
            borderBottom: 'none'
        }
    },
    paginationSelectRoot: {
        '& *': {
            color: theme.palette.secondary.light,
        },
        color: theme.palette.secondary.light,
        '&:hover': {
            color: theme.palette.tertiary.main,
            '& *': {
                color: theme.palette.tertiary.main,
            },
        },
        '&:focus': {
            color: theme.palette.tertiary.main,
            '& *': {
                color: theme.palette.tertiary.main,
            },
        }
    },
    paginationCaption: {
        color: theme.palette.secondary.light
    },
    skeleton: {
        backgroundColor: theme.palette.secondary.light
    },
    paperFilter: {
        backgroundColor: theme.palette.primary.dark,
        width: '100%',
        minHeight: 80
    },
    collapse: {
        flexShrink: 0
    },
    collapseEntered: {

    }
}));



const headers = [
    {id: ORDER_BY_USERNAME, label: 'Username', sortable: true},
    {id: ORDER_BY_JOIN_DATE, label: 'Join Date', sortable: true},
    {id: ORDER_BY_RANK, label: 'Rank', sortable: true},
    {id: ORDER_BY_NUMBER_OF_DAYS, label: 'Number of Days in CC', sortable: true},
    {id: ORDER_BY_CREATED_AT, label: 'Creation Date', sortable: true},
    {id: ORDER_BY_UPDATED_AT, label: 'Last Updated', sortable: true},
    {id: 'previous_names', label: 'Previous Names', sortable: false},
    {id: 'comment', label: 'Comment', sortable: false},
];

function SortableTableHead(props) {
    const classes = useStyles();
    const {orderBy, order, handleSort} = props;

    return (
        <TableHead className={classes.thead}>
            <TableRow>
                {
                    headers.map((header) => (
                        header.sortable ? <TableCell key={header.id}>
                            <TableSortLabel active={orderBy === header.id}
                                            direction={orderBy === header.id ? order.toLowerCase() : ORDER_ASC.toLowerCase()} onClick={(e) => {handleSort(header.id)}}
                            className={classes.sortLabel} classes={{active: classes.sortLabelActive, icon: classes.sortLabelActive}}>
                                {header.label}
                            </TableSortLabel>
                        </TableCell> : <TableCell key={header.id}>
                            {header.label}
                        </TableCell>

                    ))
                }
            </TableRow>
        </TableHead>
    )
}

function formatDateTimeFromString(datetime) {
    return format(parseISO(datetime), "dd/MM/yyyy hh:mm:ss")
}

function computeDays(datetime) {
    return differenceInDays(Date.now(), parseISO(datetime)).toString() + " days"
}

function TablePaginationOptions(props) {
    const classes = useStyles()
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.paginationRoot}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                <FirstPageIcon />
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                <KeyboardArrowLeft />
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                <KeyboardArrowRight />
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                <LastPageIcon />
            </IconButton>
        </div>
    );
}
function UsersTable() {
    const classes = useStyles();

    const [order, setOrder] = useState(ORDER_DESC);
    const [orderBy, setOrderBy] = useState(ORDER_BY_CREATED_AT);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(100);
    const [players, setPlayers] = useState([]);
    const [totalPlayers, setTotalPlayers] = useState(0);
    const {handleCall, loading} = useApi({query: PLAYERS_QUERY});

    const handleGetPlayersSuccess = (data) => {
        console.log(data)
        setPlayers(data.players)
        setTotalPlayers(data.totalPlayers)
    };

    const handleSort = (id) => {
        setOrder(orderBy === id && order === ORDER_ASC ? ORDER_DESC : ORDER_ASC);
        setOrderBy(id)
    };

    useEffect(() => {
        getPlayers();
    }, [orderBy, order, page, rowsPerPage]);

    const getPlayers = () => {
        let adjustedOrderBy = orderBy;
        if(orderBy === ORDER_BY_NUMBER_OF_DAYS) {
            adjustedOrderBy = ORDER_BY_JOIN_DATE
        }
        handleCall({variables: {order: order, order_by: adjustedOrderBy, first: rowsPerPage, skip: page * rowsPerPage}, handleSuccess: handleGetPlayersSuccess})
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage)
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} square>
                <TableToolbar/>
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table size={"small"} className={classes.table}>
                        <SortableTableHead orderBy={orderBy} order={order} handleSort={handleSort}/>
                        <TableBody className={classes.tableBody}>
                            {
                                loading ?
                                    [...Array(rowsPerPage)].map((e, i) => {
                                        return (
                                            <TableRow key={e}>
                                                <TableCell width={'10%'}>
                                                    <Skeleton className={classes.skeleton}/>
                                                </TableCell>
                                                <TableCell width={'10%'}>
                                                    <Skeleton className={classes.skeleton}/>
                                                </TableCell>
                                                <TableCell width={'5%'}>
                                                    <Skeleton className={classes.skeleton}/>
                                                </TableCell>
                                                <TableCell width={'5%'}>
                                                    <Skeleton className={classes.skeleton}/>
                                                </TableCell>
                                                <TableCell width={'10%'}>
                                                    <Skeleton className={classes.skeleton}/>
                                                </TableCell>
                                                <TableCell width={'10%'}>
                                                    <Skeleton className={classes.skeleton}/>
                                                </TableCell>
                                                <TableCell width={'20%'}>
                                                    <Skeleton className={classes.skeleton}/>
                                                </TableCell>
                                                <TableCell width={'30%'}>
                                                    <Skeleton className={classes.skeleton}/>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                    : players.map((player, index) => {
                                    return (
                                        <TableRow key={player.id}>
                                            <TableCell width={'10%'}>
                                                {player.username}
                                            </TableCell>
                                            <TableCell width={'10%'}>
                                                {formatDateTimeFromString(player.joinDate)}
                                            </TableCell>
                                            <TableCell width={'5%'}>
                                                {player.rank}
                                            </TableCell>
                                            <TableCell width={'5%'}>
                                                {computeDays(player.joinDate)}
                                            </TableCell>
                                            <TableCell width={'10%'}>
                                                {formatDateTimeFromString(player.createdAt)}
                                            </TableCell>
                                            <TableCell width={'10%'}>
                                                {formatDateTimeFromString(player.updatedAt)}
                                            </TableCell>
                                            <TableCell width={'20%'}>
                                                {"NAMES HERE"}
                                            </TableCell>
                                            <TableCell width={'30%'}>
                                                {player.comment}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                        <TableFooter className={classes.tableFooter}>
                            <TableRow>
                                <TablePagination
                                rowsPerPage={rowsPerPage}
                                rowsPerPageOptions={[50, 100, 200, 500]}
                                count={totalPlayers}
                                page={page}
                                onChangePage={handlePageChange}
                                onChangeRowsPerPage={handleRowsPerPageChange}
                                ActionsComponent={TablePaginationOptions}
                                colSpan={headers.length}
                                classes={{selectRoot: classes.paginationSelectRoot, caption: classes.paginationCaption}}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Paper>
        </div>

    );
}

export default UsersTable;
