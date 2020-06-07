import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import {
    ORDER_ASC,
    ORDER_BY_CREATED_AT,
    ORDER_BY_JOIN_DATE,
    ORDER_BY_NUMBER_OF_DAYS,
    ORDER_BY_RANK,
    ORDER_BY_UPDATED_AT,
    ORDER_BY_USERNAME
} from "../assets/filters";

const useStyles = makeStyles(theme => ({
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
                                            direction={orderBy === header.id ? order.toLowerCase() : ORDER_ASC.toLowerCase()}
                                            onClick={(e) => {
                                                handleSort(header.id)
                                            }}
                                            className={classes.sortLabel}
                                            classes={{active: classes.sortLabelActive, icon: classes.sortLabelActive}}>
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

export default SortableTableHead;
