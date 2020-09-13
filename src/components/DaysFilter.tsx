import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {StyledSlider} from "../assets/theme/styledComponents";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    slider: {
        width: 200,
        marginTop: 5
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('md')]: {
            alignItems: 'center'
        }
    },
    label: {
        color: theme.palette.secondary.main,
        marginLeft: -5
    }
}));

function valueLabelFormat(value: number) {
    return value === 2000 ? "Infinity" : value;
}

export interface IDaysFilterProps {
    handler: (days: Array<number>) => void

    [key: string]: any
}

function DaysFilter({handler, ...rest}: IDaysFilterProps) {
    const classes = useStyles();
    const [daysValues, setDaysValues] = useState<Array<number>>([0, 2000]);

    const handleDaysFilterChange = (event: React.ChangeEvent<{}>, value: Array<number> | number) => {
        if (Array.isArray(value)) {
            setDaysValues(value);
            handler(value)
        }
    };

    useEffect(() => {
        handler(daysValues);
    }, [daysValues]);

    return (
        <div className={classes.container} {...rest}>
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
