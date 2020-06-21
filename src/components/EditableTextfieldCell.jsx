import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import {StyledTextField} from "../assets/styledComponents";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {MAX_USERNAME_LENGTH} from "../assets/constants";

const useStyles = makeStyles(theme => ({}));

function EditableTextfieldCell({defaultValue, name, id, multiline = false, maxLength = MAX_USERNAME_LENGTH, onChange, ...rest}) {
    const classes = useStyles();

    const [value, setValue] = useState(defaultValue);
    const [edit, setEdit] = useState(false);

    const handleEdit = (event) => {
        setEdit(true);
    };

    const handleSubmit = (event) => {
        if (event.key === 'Enter') {
            const newValue = event.target.value;
            setEdit(false);
            if (defaultValue !== value)
                onChange(name, newValue)
        }
    };

    const handleClickAway = () => {
        setEdit(false);
        if (defaultValue !== value) {
            onChange(name, value)
        }
    };

    const handleChange = (event) => {
        setValue(event.target.value)
    };

    return (
        <TableCell {...rest} onClick={handleEdit}>
            {
                edit ? <ClickAwayListener onClickAway={handleClickAway} mouseEvent={'onMouseDown'}>
                    <div><StyledTextField onKeyDown={handleSubmit} name={name}
                                          multiline={multiline} autoFocus={true} inputProps={{maxLength: maxLength}}
                                          onChange={handleChange} defaultValue={defaultValue} fullWidth={true}/></div>
                </ClickAwayListener> : defaultValue
            }
        </TableCell>
    );
}

export default EditableTextfieldCell;
