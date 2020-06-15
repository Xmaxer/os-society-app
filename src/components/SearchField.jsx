import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {StyledTextField} from "../assets/styledComponents";
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
    closeButton: {
        color: theme.palette.secondary.main
    },
}));

function SearchField(props) {

    const {handler} = props;
    const [value, setValue] = useState("");
    const classes = useStyles();

    const handleSearch = (event) => {
        const key = event.key;
        if (key === 'Enter') {
            handler(event.target.value);
        }
    };

    const handleClearSearch = (event) => {
        setValue("");
        handler("");
    };

    const handleChange = (event) => {
        setValue(event.target.value)
    };

    return (
        <StyledTextField placeholder={"search usernames"} value={value} onChange={handleChange}
                         InputProps={{
                             startAdornment: <InputAdornment position={"start"}><SearchIcon/></InputAdornment>,
                             endAdornment: <InputAdornment position={"end"}><IconButton className={classes.closeButton}
                                                                                        onClick={handleClearSearch}>
                                 <CloseIcon/></IconButton></InputAdornment>
                         }} onKeyDown={handleSearch}/>
    );
}

export default SearchField;
