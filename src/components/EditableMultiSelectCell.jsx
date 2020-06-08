import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TableCell from '@material-ui/core/TableCell';
import useApi from "../hooks/useApi";
import {PLAYER_MUTATION} from "../assets/queries";
import {StyledTextField} from "../assets/styledComponents";
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
    textfield: {
        "& svg": {
            color: theme.palette.secondary.light
        }
    },
    chip: {
        '&:hover': {
            backgroundColor: theme.palette.tertiary.main
        },
        marginLeft: 5,
        marginBottom: 5
    }
}));

function EditableMultiSelectCell({defaultValue, name, id, ...rest}) {
    const classes = useStyles();

    const [value, setValue] = useState(defaultValue);
    const {handleCall} = useApi({query: PLAYER_MUTATION});


    const handleChange = (event, option) => {
        if (option !== null) {
            const newValue = [...option];
            setValue(newValue);
            handleCall({variables: {id: id, [name]: newValue}})
        }
    };

    const getOptionLabel = (option) => {
        return option
    };

    const onEnter = (event) => {
        if (event.key === 'Enter') {
            const val = event.target.value;
            if (val.length > 0 && val.length <= 20 && value.find(e => e.toLowerCase() === val.toLowerCase()) === undefined) {
                const newValue = [...value, event.target.value];
                setValue(newValue);
                handleCall({variables: {id: id, [name]: newValue}})
            }
        }
    };

    return (
        <TableCell {...rest}>
            <Autocomplete multiple={true}
                          renderInput={(params) => <StyledTextField className={classes.textfield} {...params}
                                                                    label={"Previous names"} onKeyDown={onEnter}/>}
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
                                  />
                              ))
                          }
            />
        </TableCell>
    );
}

export default EditableMultiSelectCell;
