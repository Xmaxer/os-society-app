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
                color: theme.palette.secondary.main
            },
            borderColor: theme.palette.secondary.main,
            fontWeight: 'bold'
        }
    },
    actionContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sortLabel: {
        '&:hover': {
            color: theme.palette.secondary.main
        },
        '&:focus': {
            color: theme.palette.secondary.main
        }
    },
    sortLabelActive: {
        color: theme.palette.secondary.main + ' !important'
    },
    addNewHeader: {
        textAlign: 'center'
    },
    autocompleteTextfield: {
        "& svg": {
            color: theme.palette.secondary.light
        }
    },
    option: {
        display: 'flex',
        alignItems: 'center'
    },
    optionText: {
        marginLeft: 5
    },
    image: {
        height: 15,
        width: 15
    },
    datePickerRoot: {
        '&:after': {
            borderBottomColor: theme.palette.secondary.main
        },
        '&:before': {
            borderBottomColor: theme.palette.secondary.light
        },
        '&:hover:not($disabled):before': {
            borderBottomColor: theme.palette.primary.light + " !important",
        },
        color: theme.palette.secondary.main,
        '& label.Mui-focused': {
            color: theme.palette.secondary.main
        },
        '& label': {
            color: theme.palette.secondary.light
        },
        '& svg': {
            color: theme.palette.secondary.light
        }
    },
    chip: {
        '&:hover': {
            backgroundColor: theme.palette.secondary.main
        },
        marginLeft: 5,
        marginBottom: 5
    },
}));

export const headers = [
    {id: ORDER_BY_USERNAME, label: 'Username', sortable: true, align: 'left'},
    {id: ORDER_BY_JOIN_DATE, label: 'Join Date', sortable: true, align: 'left'},
    {id: ORDER_BY_RANK, label: 'Rank', sortable: true, align: 'left'},
    {id: ORDER_BY_NUMBER_OF_DAYS, label: 'Number of Days in CC', sortable: true, align: 'left'},
    {id: ORDER_BY_CREATED_AT, label: 'Creation Date', sortable: true, align: 'center'},
    {id: ORDER_BY_UPDATED_AT, label: 'Last Updated', sortable: true, align: 'center'},
    {id: 'previous_names', label: 'Previous Names', sortable: false, align: 'center'},
    {id: 'comment', label: 'Comment', sortable: false, align: 'left'},
    {id: 'actions', label: 'Actions', sortable: false, align: 'center'},
];
export const headerDistribution = [
    {percentage: '10%', min: '120px'},
    {percentage: '10%', min: '150px'},
    {percentage: '10%', min: '150px'},
    {percentage: '5%', min: '100px'},
    {percentage: '10%', min: '100px'},
    {percentage: '10%', min: '100px'},
    {percentage: '20%', min: '150px'},
    {percentage: '15%', min: '200px'},
    {percentage: '10%', min: '100px'},
]

function SortableTableHead(props) {
    const classes = useStyles();
    const {orderBy, order, handleSort} = props;

    return (
        <TableHead className={classes.thead}>
            <TableRow>
                {
                    headers.map((header, index) => (
                        header.sortable ?
                            <TableCell key={header.id} width={headerDistribution[index].percentage} align={header.align}
                                       style={{minWidth: headerDistribution[index].min}}>
                                <TableSortLabel active={orderBy === header.id}
                                                direction={orderBy === header.id ? order.toLowerCase() : ORDER_ASC.toLowerCase()}
                                                onClick={(e) => {
                                                    handleSort(header.id)
                                                }}
                                                className={classes.sortLabel}
                                                classes={{
                                                    active: classes.sortLabelActive,
                                                    icon: classes.sortLabelActive
                                                }}>
                                    {header.label}
                                </TableSortLabel>
                            </TableCell> :
                            <TableCell key={header.id} width={headerDistribution[index]} align={header.align}
                                       style={{minWidth: headerDistribution[index].min}}>
                                {header.label}
                            </TableCell>

                    ))
                }
            </TableRow>
        </TableHead>
    )
}

export default SortableTableHead;
