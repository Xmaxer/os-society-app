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
    reset?: boolean

    [key: string]: any
}

export const MAX_DAYS = 2000
export const MIN_DAYS = 0

function DaysFilter({handler, reset, ...rest}: IDaysFilterProps) {
    const classes = useStyles();
    const [daysValues, setDaysValues] = useState<Array<number>>([MIN_DAYS, MAX_DAYS]);

    const handleDaysFilterChange = (event: React.ChangeEvent<{}>, value: Array<number> | number) => {
        if (Array.isArray(value)) {
            setDaysValues(value);
            handler(value)
        }
    };

    useEffect(() => {
        if (reset) {
            setDaysValues([MIN_DAYS, MAX_DAYS])
        }
    }, [reset])

    return (
        <div className={classes.container} {...rest}>
            <Typography className={classes.label}>Number of Days in CC</Typography>
            <StyledSlider min={MIN_DAYS}
                          max={MAX_DAYS}
                          value={daysValues}
                          onChange={handleDaysFilterChange}
                          className={classes.slider}
                          valueLabelDisplay={'on'} valueLabelFormat={valueLabelFormat}/>
        </div>

    );
}

export default DaysFilter;
