import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TableCell from '@material-ui/core/TableCell';
import {StyledIconButton, StyledTextField} from "../assets/styledComponents";
import Chip from '@material-ui/core/Chip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import {MAX_USERNAME_LENGTH} from "../assets/constants";

const useStyles = makeStyles(theme => ({
    textfield: {
        "& svg": {
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
    addIcon: {
        marginLeft: 'auto',
    },
    container: {
        display: 'flex',
    },
    chipContainer: {
        display: 'flex',
        alignItems: 'center',
        flexFlow: 'wrap'
    },
    autocomplete: {
        flexGrow: 1
    }
}));

function EditableMultiSelectCell({defaultValue, name, id, onChange, ...rest}) {
    const classes = useStyles();

    const [value, setValue] = useState(defaultValue);
    const [edit, setEdit] = useState(false);

    const handleEdit = (event) => {
        setEdit(true);
    };

    const handleChange = (event, option) => {
        if (option !== null) {
            const newValue = [...option];
            setValue(newValue);
            onChange(name, newValue)
        }
    };

    const getOptionLabel = (option) => {
        return option
    };

    const handleClickAway = () => {
        setEdit(false);
        if (defaultValue !== value) {
            onChange(name, value)
        }
    };

    const handleDelete = (option) => {
        if (option !== null) {
            const newValue = [...value].filter((e) => e !== option);
            setValue(newValue);
            onChange(name, newValue)
        }
    }

    const handleCancel = () => {
        setEdit(false)
    }
    const onEnter = (event) => {
        if (event.key === 'Enter') {
            const val = event.target.value;
            if (val.length > 0 && val.length <= MAX_USERNAME_LENGTH && value.find(e => e.toLowerCase() === val.toLowerCase()) === undefined) {
                const newValue = [...value, event.target.value];
                setValue(newValue);
                onChange(name, newValue)
            }
        }
    };

    return (
        <TableCell {...rest}>
            {
                edit ? <div className={classes.container}><ClickAwayListener onClickAway={handleClickAway}>
                        <Autocomplete className={classes.autocomplete}
                                      multiple={true}
                                      renderInput={(params) => <StyledTextField autoFocus={true}
                                                                                className={classes.textfield} {...params}
                                                                                label={"Previous names"}
                                                                                onKeyDown={onEnter} fullWidth={true}/>}
                                      options={[]}
                                      getOptionLabel={getOptionLabel}
                                      onChange={handleChange}
                                      value={value}
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
                    </ClickAwayListener>
                        <Tooltip title={"Cancel"}>
                            <StyledIconButton onClick={handleCancel} className={classes.addIcon}>
                                <CloseIcon/>
                            </StyledIconButton>
                        </Tooltip>
                    </div>
                    : <div className={classes.container}>
                        <div className={classes.chipContainer}>
                            {
                                value.map((pname) => (
                                    <Chip
                                        label={pname}
                                        className={classes.chip}
                                        onDelete={() => handleDelete(pname)}
                                        key={pname}
                                    />
                                ))
                            }
                        </div>
                        <StyledIconButton onClick={handleEdit} className={classes.addIcon}>
                            <AddIcon/>
                        </StyledIconButton>
                    </div>
            }
        </TableCell>
    );
}

export default EditableMultiSelectCell;
