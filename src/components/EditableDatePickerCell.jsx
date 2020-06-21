import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import TableCell from '@material-ui/core/TableCell';
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
}));
export const datePickerTheme = createMuiTheme({
    palette: {
        primary: palette.secondary,
        secondary: palette.primary
    },
    disabled: {}
});

function formatDate(datetime) {
    return format(parseISO(datetime), "dd/MM/yyyy")
}


function EditableDatePickerCell({defaultValue, name, id, onChange, ...rest}) {

    const classes = useStyles();

    const [value, setValue] = useState(parseISO(defaultValue));
    const [edit, setEdit] = useState(false);

    const handleEdit = (event) => {
        setEdit(true);
    };

    const handleChange = (date) => {
        const newValue = date;
        setEdit(false);
        setValue(newValue);
        onChange(name, newValue)
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
                                                    value={defaultValue} onChange={handleChange}
                                                    maxDate={Date.now()}/>
                            </div>
                        </ClickAwayListener>
                    </ThemeProvider> : formatDate(defaultValue)
                }
            </TableCell>
        </MuiPickersUtilsProvider>
    );
}

export default EditableDatePickerCell;
