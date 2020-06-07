import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {StyledSlider} from "../assets/styledComponents";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    slider: {
        width: 200,
        marginTop: 5
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        color: theme.palette.secondary.light,
        marginLeft: -5
    }
}));

function valueLabelFormat(value) {
    return value === 2000 ? "Infinity" : value;
}

function DaysFilter(props) {
    const classes = useStyles();
    const {handler} = props;
    const [daysValues, setDaysValues] = useState([0, 2000]);

    const handleDaysFilterChange = (event, newValue) => {
        setDaysValues(newValue);
        handler(newValue)
    };

    useEffect(() => {
        handler(daysValues);
    }, [daysValues]);

    return (
        <div className={classes.container}>
            <Typography className={classes.label}>Number of Days in CC</Typography>
            <StyledSlider min={0}
                          max={2000}
                          value={daysValues}
                          onChange={handleDaysFilterChange}
                          className={classes.slider}
                          valueLabelDisplay={'on'} valueLabelFormat={valueLabelFormat}/>
        </div>

    );
}

export default DaysFilter;
