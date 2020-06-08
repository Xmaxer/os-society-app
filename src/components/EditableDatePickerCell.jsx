import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import TableCell from '@material-ui/core/TableCell';
import useApi from "../hooks/useApi";
import {PLAYER_MUTATION} from "../assets/queries";
import parseISO from 'date-fns/parseISO'
import format from 'date-fns/format'
import DateFnsUtils from '@date-io/date-fns';
import enGB from "date-fns/locale/en-GB"
import {createMuiTheme} from '@material-ui/core'
import palette from "../assets/colours";
import {ThemeProvider} from '@material-ui/styles';
import {StyledTextField} from "../assets/styledComponents";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const useStyles = makeStyles(theme => ({
    root: {
        '&:after': {
            borderBottomColor: theme.palette.tertiary.main
        },
        '&:before': {
            borderBottomColor: theme.palette.secondary.light
        },
        '&:hover:not($disabled):before': {
            borderBottomColor: theme.palette.primary.main + " !important",
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
}));
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

function formatDateTime(datetime) {
    return format(datetime, "dd/MM/yyyy hh:mm:ss")
}

function EditableDatePickerCell({defaultValue, name, id, ...rest}) {

    const classes = useStyles();

    const [value, setValue] = useState(parseISO(defaultValue));
    const [edit, setEdit] = useState(false);
    const {handleCall} = useApi({query: PLAYER_MUTATION});

    const handleEdit = (event) => {
        setEdit(true);
    };

    const handleChange = (date) => {
        const newValue = date;
        setEdit(false);
        setValue(newValue);
        handleCall({variables: {id: id, [name]: newValue}})
    };

    const handleClickAway = () => {
        setEdit(false);
    };

    return (
        <MuiPickersUtilsProvider locale={enGB} utils={DateFnsUtils}>
            <TableCell {...rest} onClick={handleEdit}>
                {
                    edit ? <ThemeProvider theme={datePickerTheme}>
                        <ClickAwayListener onClickAway={handleClickAway}>
                            <div>
                                <KeyboardDatePicker InputProps={{classes: {root: classes.root}}}
                                                    TextFieldComponent={StyledTextField} variant={'inline'}
                                                    format={"dd/MM/yyyy"} name={name} label={"Player's Join Date"}
                                                    value={value} onChange={handleChange}/>
                            </div>
                        </ClickAwayListener>
                    </ThemeProvider> : formatDateTime(value)
                }
            </TableCell>
        </MuiPickersUtilsProvider>
    );
}

export default EditableDatePickerCell;
