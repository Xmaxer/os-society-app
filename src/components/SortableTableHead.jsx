import React, {useState} from 'react';
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
import {StyledButton, StyledIconButton, StyledTextField} from "../assets/styledComponents";
import useApi from "../hooks/useApi";
import {PLAYER_MUTATION} from "../assets/queries";
import {Formik} from "formik";
import differenceInDays from "date-fns/differenceInDays";
import toDate from "date-fns/toDate";
import CloseIcon from '@material-ui/icons/Close';
import Autocomplete from "@material-ui/lab/Autocomplete";
import Typography from "@material-ui/core/Typography";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {createMuiTheme} from "@material-ui/core";
import palette from "../assets/colours";
import {ThemeProvider} from "@material-ui/styles";
import Chip from "@material-ui/core/Chip";
import enGB from "date-fns/locale/en-GB";
import DateFnsUtils from "@date-io/date-fns";
import SaveIcon from '@material-ui/icons/Save';
import Tooltip from "@material-ui/core/Tooltip";

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
    actionContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
    addNewHeader: {
        top: "85px !important",
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
            borderBottomColor: theme.palette.tertiary.main
        },
        '&:before': {
            borderBottomColor: theme.palette.secondary.light
        },
        '&:hover:not($disabled):before': {
            borderBottomColor: theme.palette.primary.light + " !important",
        },
        color: theme.palette.tertiary.main,
        '& label.Mui-focused': {
            color: theme.palette.tertiary.main
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
            backgroundColor: theme.palette.tertiary.main
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
    "10%",
    "10%",
    "10%",
    "5%",
    "10%",
    "10%",
    "20%",
    "15%",
    "10%"
]

const options = [
    {img: null, label: "Unranked", id: 0},
    {img: '/images/friend_rank.png', label: "Friend", id: 1},
    {img: '/images/recruit_rank.png', label: "Recruit", id: 2},
    {img: '/images/corporal_rank.png', label: "Corporal", id: 3},
    {img: '/images/sergeant_rank.png', label: "Sergeant", id: 4},
    {img: '/images/lieutenant_rank.png', label: "Lieutenant", id: 5},
    {img: '/images/captain_rank.png', label: "Captain", id: 6},
    {img: '/images/general_rank.png', label: "General", id: 7},
    {img: '/images/owner_rank.png', label: "Owner", id: 8},
];

function computeDays(datetime) {
    return differenceInDays(Date.now(), datetime).toString() + " days"
}

export const datePickerTheme = createMuiTheme({
    palette: {
        primary: {
            main: palette.secondary
        },
        secondary: {
            main: palette.primary
        },

        tertiary: {
            main: palette.tertiary
        },
    },
    disabled: {}
});

function SortableTableHead(props) {
    const classes = useStyles();
    const {orderBy, order, handleSort, handleAddNewPlayer} = props;

    const [edit, setEdit] = useState(false);
    const {handleCall} = useApi({query: PLAYER_MUTATION});

    const handleNewPlayerClick = (event) => {
        setEdit(true)
    };

    const handleCancel = (event) => {
        setEdit(false)
    }

    const idToLabel = (id) => {
        const item = options.find((e) => e.id === id);
        return <div className={classes.option}>
            {item.img ? <img src={item.img} alt={""} className={classes.image}/> : null}
            <Typography className={classes.optionText}>{item.label}</Typography>
        </div>
    };

    const getOptionLabel = (option) => {
        return option.label
    };

    const renderOption = (option) => {
        return (
            <React.Fragment>
                {idToLabel(option.id)}
            </React.Fragment>
        )
    };

    const handleSuccess = (data) => {
        handleAddNewPlayer(data)
        setEdit(false)
    }

    const onEnter = (event, setFieldValue, currentValues) => {
        if (event.key === 'Enter') {
            const val = event.target.value;
            if (val.length > 0 && val.length <= 20 && currentValues.find(e => e.toLowerCase() === val.toLowerCase()) === undefined) {
                const newValue = [...currentValues, event.target.value];
                setFieldValue('previous_names', newValue);
            }
        }
    };

    return (
        <TableHead className={classes.thead}>
            <TableRow>
                {
                    headers.map((header, index) => (
                        header.sortable ?
                            <TableCell key={header.id} width={headerDistribution[index]} align={header.align}>
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
                            <TableCell key={header.id} width={headerDistribution[index]} align={header.align}>
                                {header.label}
                            </TableCell>

                    ))
                }
            </TableRow>
            {
                edit ?
                    <Formik initialValues={{
                        username: '',
                        join_date: toDate(Date.now()),
                        rank: 0,
                        previous_names: [],
                        comment: ''
                    }} onSubmit={(values, {setSubmitting, resetForm}) => {
                        setSubmitting(true);
                        handleCall({
                            variables: {...values}, handleComplete: () => {
                                resetForm()
                                setSubmitting(false)
                            }, handleSuccess: handleSuccess
                        });
                    }}>
                        {({values, handleChange, handleSubmit, isSubmitting, setFieldValue}) => (
                            <TableRow>
                                <TableCell width={'10%'}>
                                    <StyledTextField name={"username"} autoFocus={true} inputProps={{maxLength: 20}}
                                                     onChange={handleChange} value={values.username}
                                                     fullWidth={true}/>
                                </TableCell>
                                <TableCell width={'10%'}>
                                    <MuiPickersUtilsProvider locale={enGB} utils={DateFnsUtils}>
                                        <ThemeProvider theme={datePickerTheme}>
                                            <KeyboardDatePicker
                                                InputProps={{classes: {root: classes.datePickerRoot}}}
                                                TextFieldComponent={StyledTextField} variant={'inline'}
                                                format={"dd/MM/yyyy"} name={'join_date'}
                                                label={"Player's Join Date"}
                                                value={values.join_date} onChange={(date) => {
                                                setFieldValue('join_date', toDate(date))
                                            }}
                                                maxDate={Date.now()}/>
                                        </ThemeProvider>
                                    </MuiPickersUtilsProvider>
                                </TableCell>
                                <TableCell width={'10%'}>
                                    <Autocomplete renderInput={(params) => <StyledTextField
                                        className={classes.autocompleteTextfield} {...params}
                                        label={"Rank"}/>}
                                                  options={options}
                                                  getOptionLabel={getOptionLabel}
                                                  onChange={(event, option) => {
                                                      setFieldValue('rank', option.id)
                                                  }}
                                                  renderOption={renderOption}
                                                  defaultValue={options.find((e) => e.id === 0)} name={'rank'}/>
                                </TableCell>
                                <TableCell width={'5%'}>
                                    {computeDays(values.join_date)}
                                </TableCell>
                                <TableCell width={'10%'}>
                                    {"Now"}
                                </TableCell>
                                <TableCell width={'10%'}>
                                    {"Now"}
                                </TableCell>
                                <TableCell width={'20%'}>
                                    <Autocomplete multiple={true}
                                                  name={'previous_names'}
                                                  renderInput={(params) => <StyledTextField autoFocus={true}
                                                                                            className={classes.autocompleteTextfield} {...params}
                                                                                            label={"Previous names"}
                                                                                            onKeyDown={(event) => {
                                                                                                onEnter(event, setFieldValue, values.previous_names)
                                                                                            }}/>}
                                                  options={[]}
                                                  getOptionLabel={(option) => {
                                                      return option
                                                  }}
                                                  onChange={(event, option) => {
                                                      setFieldValue('previous_names', option)
                                                  }}
                                                  value={values.previous_names}
                                                  renderTags={(tagValue, getTagProps) =>
                                                      tagValue.map((option, index) => (
                                                          <Chip
                                                              label={option}
                                                              {...getTagProps({index})}
                                                              className={classes.chip}
                                                              key={option}
                                                          />
                                                      ))
                                                  }
                                    />
                                </TableCell>
                                <TableCell width={'20%'}>
                                    <StyledTextField name={"comment"}
                                                     multiline={true} inputProps={{maxLength: 200}}
                                                     onChange={handleChange} value={values.comment}
                                                     fullWidth={true}/>
                                </TableCell>
                                <TableCell>
                                    <div className={classes.actionContainer}>
                                        <Tooltip title={"Save"}>
                                            <StyledIconButton onClick={handleSubmit}>
                                                <SaveIcon/>
                                            </StyledIconButton>
                                        </Tooltip>
                                        <Tooltip title={"Cancel"}>
                                            <StyledIconButton onClick={handleCancel}>
                                                <CloseIcon/>
                                            </StyledIconButton>
                                        </Tooltip>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </Formik>
                    : <TableRow><TableCell colSpan={headers.length} className={classes.addNewHeader}>
                        <StyledButton onClick={handleNewPlayerClick}>Add new player</StyledButton>
                    </TableCell></TableRow>
            }

        </TableHead>
    )
}

export default SortableTableHead;
