import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import TableCell from '@material-ui/core/TableCell';
import useApi from "../hooks/useApi";
import {PLAYER_MUTATION} from "../assets/queries";
import Typography from '@material-ui/core/Typography';
import {StyledTextField} from "../assets/styledComponents";

const useStyles = makeStyles(theme => ({
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
    textfield: {
        "& svg": {
            color: theme.palette.secondary.light
        }
    }
}));

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


function EditableAutcompleteCell({defaultValue, name, id, ...rest}) {
    const classes = useStyles();

    const [value, setValue] = useState(parseInt(defaultValue));
    const [edit, setEdit] = useState(false);
    const {handleCall} = useApi({query: PLAYER_MUTATION});

    const handleEdit = (event) => {
        setEdit(true);
    };

    const handleChange = (event, option) => {
        if (option !== null) {
            const newValue = option.id;
            setEdit(false);
            setValue(newValue);
            handleCall({variables: {id: id, [name]: newValue}})
        }
    };

    const handleClickAway = () => {
        setEdit(false);
    };

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

    return (
        <TableCell {...rest} onClick={handleEdit}>
            {edit ? <ClickAwayListener onClickAway={handleClickAway}>
                <div>
                    <Autocomplete renderInput={(params) => <StyledTextField className={classes.textfield} {...params}
                                                                            label={"Rank"}/>}
                                  options={options}
                                  getOptionLabel={getOptionLabel}
                                  onChange={handleChange}
                                  renderOption={renderOption}
                                  defaultValue={options.find((e) => e.id === parseInt(defaultValue))}
                    />
                </div>
            </ClickAwayListener> : idToLabel(value)}
        </TableCell>
    );
}

export default EditableAutcompleteCell;
