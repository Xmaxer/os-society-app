import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import {StyledTextField} from "../assets/styledComponents";
import useApi from "../hooks/useApi";
import {PLAYER_MUTATION} from "../assets/queries";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const useStyles = makeStyles(theme => ({}));

function EditableTextfieldCell({defaultValue, name, id, multiline = false, maxLength = 20, ...rest}) {
    const classes = useStyles();

    const [value, setValue] = useState(defaultValue);
    const [edit, setEdit] = useState(false);
    const {handleCall} = useApi({query: PLAYER_MUTATION});
    const handleEdit = (event) => {
        setEdit(true);
    };

    const handleSubmit = (event) => {
        if (event.key === 'Enter') {
            const newValue = event.target.value;
            setEdit(false);
            setValue(newValue);
            handleCall({variables: {id: id, [name]: newValue}})
        }
    };

    const handleClickAway = () => {
        setEdit(false);
        if (defaultValue !== value) {
            handleCall({variables: {id: id, [name]: value}})
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
                                          onChange={handleChange} value={value} fullWidth={true}/></div>
                </ClickAwayListener> : value
            }
        </TableCell>
    );
}

export default EditableTextfieldCell;
