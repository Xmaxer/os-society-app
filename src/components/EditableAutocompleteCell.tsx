import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import {StyledTextField} from "../assets/theme/styledComponents";

const useStyles = makeStyles(theme => ({
    option: {
        display: 'flex',
        alignItems: 'center',
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

export interface EditableAutocompleteCellProps {
    defaultValue: number
    name: string
    id: string
    onChange: (name: string, value: number) => void

    [key: string]: any
}

function EditableAutocompleteCell({defaultValue, name, id, onChange, ...rest}: EditableAutocompleteCellProps) {
    const classes = useStyles();

    const [value, setValue] = useState(options.find(e => e.id === defaultValue));
    const [edit, setEdit] = useState(false);

    const handleEdit = () => {
        setEdit(true);
    };

    const handleChange = (event: React.ChangeEvent<{}>, option: typeof options[0] | null) => {
        if (option !== null) {
            const newValue = option.id;
            setEdit(false);
            setValue(option)
            onChange(name, newValue)
        }
    };

    const handleClickAway = () => {
        setEdit(false);
    };

    const idToLabel = (id?: number) => {
        const item = options.find((e) => e.id === id);
        if (item) {
            return <div className={classes.option}>
                {item.img ? <img src={item.img} alt={""} className={classes.image}/> : null}
                <Typography className={classes.optionText}>{item.label}</Typography>
            </div>
        }
    };

    const getOptionLabel = (option: typeof options[0]) => {
        return option.label
    };

    const renderOption = (option: typeof options[0]) => {
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
                                  value={value}
                                  defaultValue={options.find((e) => e.id === defaultValue)}
                    />
                </div>
            </ClickAwayListener> : idToLabel(value ? value.id : undefined)}
        </TableCell>
    );
}

export default EditableAutocompleteCell;
