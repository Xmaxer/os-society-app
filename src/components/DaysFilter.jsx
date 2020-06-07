import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {StyledSlider} from "../assets/styledComponents";

const useStyles = makeStyles(theme => ({}));

function DaysFilter() {

    const [daysValues, setDaysValues] = useState([0, 2000]);

    const handleDaysFilterChange = (event, newValue) => {
        setDaysValues(newValue)
    };

    return (
        <StyledSlider min={0} max={2000} value={daysValues} onChange={handleDaysFilterChange}/>
    );
}

export default DaysFilter;
