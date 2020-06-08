import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useApi from "../hooks/useApi";
import {PLAYERS_QUERY} from "../assets/queries";
import parseISO from 'date-fns/parseISO'
import format from 'date-fns/format'
import differenceInDays from 'date-fns/differenceInDays'
import subDays from 'date-fns/subDays'
import formatISO from 'date-fns/formatISO'
import {
    ORDER_ASC,
    ORDER_BY_CREATED_AT,
    ORDER_BY_JOIN_DATE,
    ORDER_BY_NUMBER_OF_DAYS,
    ORDER_DESC
} from "../assets/filters";
import Skeleton from '@material-ui/lab/Skeleton';
import SortableTableHead from "./SortableTableHead";
import TablePaginationOptions from "./TablePaginationOptions";
import EditableTextfieldCell from "./EditableTextfieldCell";
import EditableDatePickerCell from "./EditableDatePickerCell";
import EditableAutcompleteCell from "./EditableAutcompleteCell";
import EditableMultiSelectCell from "./EditableMultiSelectCell";

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 500
    },
    tableContainer: {
        overflowY: 'auto',
        borderRadius: 0
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
}));

function formatDateTimeFromString(datetime) {
    return format(parseISO(datetime), "dd/MM/yyyy hh:mm:ss")
}

function computeDays(datetime) {
    return differenceInDays(Date.now(), parseISO(datetime)).toString() + " days"
}

const rowsPerPageOptions = [25, 50, 75, 100];
function PlayerTable(props) {

    const classes = useStyles();
    const {days, ranks, search} = props;
    const [order, setOrder] = useState(ORDER_DESC);
    const [orderBy, setOrderBy] = useState(ORDER_BY_CREATED_AT);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0]);
    const [players, setPlayers] = useState([]);
    const [totalPlayers, setTotalPlayers] = useState(0);
    const {handleCall, loading} = useApi({query: PLAYERS_QUERY});

    const handleGetPlayersSuccess = (data) => {
        console.log(data);
        setPlayers(data.players);
        setTotalPlayers(data.totalPlayers)
    };

    const handleSort = (id) => {
        setOrder(orderBy === id && order === ORDER_ASC ? ORDER_DESC : ORDER_ASC);
        setOrderBy(id)
    };

    useEffect(() => {
        getPlayers();
    }, [orderBy, order, page, rowsPerPage, days, ranks, search]);

    const getPlayers = () => {
        let adjustedOrderBy = orderBy;
        if (orderBy === ORDER_BY_NUMBER_OF_DAYS) {
            adjustedOrderBy = ORDER_BY_JOIN_DATE
        }

        let convertedRanks = null;
        let start_join_date = null;
        let end_join_date = null;

        if (ranks) {
            convertedRanks = ranks && Object.entries(ranks).map((rank, i) => {
                if (rank[1] === true) return i;
            });

            convertedRanks = convertedRanks.filter((rank) => {
                return rank !== undefined
            });
        }

        if (days && days[0] !== 0) start_join_date = formatISO(subDays(Date.now(), days[0]));
        if (days && days[1] !== 2000) end_join_date = formatISO(subDays(Date.now(), days[1]));

        handleCall({
            variables: {
                order: order,
                order_by: adjustedOrderBy,
                first: rowsPerPage,
                skip: page * rowsPerPage,
                rank_contains: convertedRanks,
                username_or_previous_name_contains: search,
                start_join_date: start_join_date,
                end_join_date: end_join_date
            }, handleSuccess: handleGetPlayersSuccess
        })
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage)
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table size={"small"} className={classes.table}>
                <SortableTableHead orderBy={orderBy} order={order} handleSort={handleSort}/>
                <TableBody className={classes.tableBody}>
                    {
                        loading ?
                            [...Array(rowsPerPage)].map((e, i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell width={'100%'} colSpan={8}>
                                            <Skeleton className={classes.skeleton}/>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                            : players.map((player, index) => {
                                return (
                                    <TableRow key={player.id}>
                                        <EditableTextfieldCell defaultValue={player.username} id={player.id}
                                                               name={'username'} width={'10%'}/>
                                        <EditableDatePickerCell width={'10%'} defaultValue={player.joinDate}
                                                                id={player.id} name={'join_date'}/>
                                        <EditableAutcompleteCell width={'10%'} defaultValue={player.rank} id={player.id}
                                                                 name={"rank"}/>
                                        <TableCell width={'5%'}>
                                            {computeDays(player.joinDate)}
                                        </TableCell>
                                        <TableCell width={'10%'}>
                                            {formatDateTimeFromString(player.createdAt)}
                                        </TableCell>
                                        <TableCell width={'10%'}>
                                            {formatDateTimeFromString(player.updatedAt)}
                                        </TableCell>
                                        <EditableMultiSelectCell width={'20%'} defaultValue={player.previousNames}
                                                                 id={player.id} name={"previous_names"}/>
                                        <EditableTextfieldCell width={'25%'} defaultValue={player.comment}
                                                               id={player.id} name={"comment"} multiline={true}
                                                               maxLength={200}/>
                                    </TableRow>
                                )
                            })
                    }
                </TableBody>
                <TableFooter className={classes.tableFooter}>
                    <TableRow key={'pagination'}>
                        <TablePagination
                            rowsPerPage={rowsPerPage}
                            rowsPerPageOptions={rowsPerPageOptions}
                            count={totalPlayers}
                            page={page}
                            onChangePage={handlePageChange}
                            onChangeRowsPerPage={handleRowsPerPageChange}
                            ActionsComponent={TablePaginationOptions}
                            colSpan={8}
                            classes={{selectRoot: classes.paginationSelectRoot, caption: classes.paginationCaption}}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}

export default PlayerTable;
