import React, {useState} from 'react';
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import {DesktopDatePicker, LocalizationProvider} from '@material-ui/pickers';
import TableCell from '@material-ui/core/TableCell';
import parseISO from 'date-fns/parseISO'
import format from 'date-fns/format'
import enGB from "date-fns/locale/en-GB"
import {createMuiTheme} from '@material-ui/core'
import palette from "../assets/theme/colours";
import {StyledTextField} from "../assets/theme/styledComponents";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import DateFnsAdapter from "@material-ui/pickers/adapter/date-fns";

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
        '& svg': {
            color: theme.palette.secondary.light
        }
    },
    datePickerTextField: {
        '& label.Mui-focused': {
            color: theme.palette.secondary.main
        },
        '& label': {
            color: theme.palette.secondary.light
        },
    }
}));
export const datePickerTheme = createMuiTheme({
    palette: {
        primary: palette.secondary,
        secondary: palette.primary
    },
    // disabled: {}
});

function formatDate(datetime: string) {
    return format(parseISO(datetime), "dd/MM/yyyy")
}


export interface EditableDatePickerCellProps {
    defaultValue: string
    name: string
    id: string
    onChange: (name: string, value: Date) => void

    [key: string]: any
}

function EditableDatePickerCell({defaultValue, name, id, onChange, ...rest}: EditableDatePickerCellProps) {

    const classes = useStyles();

    const [value, setValue] = useState(parseISO(defaultValue));
    const [edit, setEdit] = useState(false);

    const handleEdit = () => {
        setEdit(true);
    };

    const handleChange = (date: Date | null) => {
        const newValue = date;
        setEdit(false);
        setValue(newValue as Date);
        onChange(name, newValue as Date)
    };

    const handleClickAway = () => {
        setEdit(false);
    };

    return (
        <LocalizationProvider locale={enGB} dateAdapter={DateFnsAdapter as any}>
            <TableCell {...rest} onClick={handleEdit}>
                {
                    edit ? <ThemeProvider theme={datePickerTheme}>
                        <ClickAwayListener onClickAway={handleClickAway}>
                            <div>
                                <DesktopDatePicker InputProps={{classes: {root: classes.root}}}
                                                   renderInput={(props) => <StyledTextField {...props}
                                                                                            className={classes.datePickerTextField}
                                                                                            helperText={null}/>}
                                                   label={"Player's Join Date"}
                                                   value={value} onChange={handleChange}
                                                   maxDate={Date.now()}/>
                            </div>
                        </ClickAwayListener>
                    </ThemeProvider> : formatDate(defaultValue)
                }
            </TableCell>
        </LocalizationProvider>
    );
}

export default EditableDatePickerCell;
