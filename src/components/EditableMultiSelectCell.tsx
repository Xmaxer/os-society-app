import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import {StyledIconButton} from "../assets/theme/styledComponents";
import Chip from '@material-ui/core/Chip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import NewPlayerPreviousNameField from "./NewPlayerPreviousNameField";
import {Typography} from "@material-ui/core";

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
        "&:hover": {
            color: theme.palette.success.main
        }
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
    },
    cellWrapper: {
        height: 70,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center'
    },
    additionalTags: {
        marginLeft: 10
    }
}));

export interface EditableMultiSelectCellProps {
    defaultValue: Array<string>
    name: string
    id: string
    onChange: (name: string, value: Array<string>) => void

    [key: string]: any
}

function EditableMultiSelectCell({defaultValue, name, id, onChange, ...rest}: EditableMultiSelectCellProps) {
    const classes = useStyles();

    const [value, setValue] = useState(defaultValue);
    const [edit, setEdit] = useState(false);

    const handleEdit = () => {
        setEdit(true);
    };

    const handleChange = (event: React.ChangeEvent<{}>, option: Array<string> | null) => {
        if (option !== null) {
            const newValue = [...option];
            setValue(newValue);
            onChange(name, newValue)
        }
    };

    const handleClickAway = () => {
        setEdit(false);
        if (defaultValue !== value) {
            onChange(name, value)
        }
    };

    const handleDelete = (option: string) => {
        if (option !== null) {
            const newValue = [...value].filter((e) => e !== option);
            setValue(newValue);
            onChange(name, newValue)
        }
    }

    const handleCancel = () => {
        setEdit(false)
    }

    return (
        <TableCell {...rest}>
            <div className={classes.cellWrapper}>
                {
                    edit ? <div className={classes.container}><ClickAwayListener onClickAway={handleClickAway}>
                            <div>
                                <NewPlayerPreviousNameField changeHandler={handleChange} value={value}/>
                            </div>
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
                                    value.map((pname, index) => {
                                        if (index < 2) {
                                            return <Chip
                                                label={pname}
                                                className={classes.chip}
                                                onDelete={() => handleDelete(pname)}
                                                key={pname}
                                            />
                                        }
                                    })
                                }
                                {
                                    value.length > 2 && <Tooltip title={`${value.slice(2).join(", ")}`}><Typography
                                        className={classes.additionalTags}>{`+${value.length - 2}`}</Typography></Tooltip>
                                }
                            </div>
                            <StyledIconButton onClick={handleEdit} className={classes.addIcon}>
                                <AddIcon/>
                            </StyledIconButton>
                        </div>
                }
            </div>
        </TableCell>
    );
}

export default EditableMultiSelectCell;
