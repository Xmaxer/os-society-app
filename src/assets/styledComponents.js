import React from 'react';
import {Button, Slider, TextField} from '@material-ui/core'
import {makeStyles, withStyles} from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export const StyledButton = withStyles(theme => ({
    text: {
        color: theme.palette.secondary.light,
        '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.tertiary.main
        }
    },
    contained: {
        '&:hover': {
            backgroundColor: theme.palette.tertiary.main
        }
    }
}))(Button);

export const StyledTextField = withStyles(theme => ({
    root: {
        '& .MuiInput-underline:after': {
            borderBottomColor: theme.palette.tertiary.main
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: theme.palette.secondary.light
        },
        '& .MuiInput-underline:hover:before': {
            borderBottomColor: theme.palette.secondary.dark
        },
        '& .MuiInput-root': {
            color: theme.palette.tertiary.main
        },
        '& label.Mui-focused': {
            color: theme.palette.tertiary.main
        },
        '& label': {
            color: theme.palette.secondary.light
        },
    }
}))(TextField);

export const StyledSlider = withStyles(theme => ({
    valueLabel: {
        top: 22,
        '& *': {
            background: 'transparent',
            color: theme.palette.secondary.light,
        },
    },
    colorPrimary: {
        color: theme.palette.secondary.light
    },
    active: {
        color: theme.palette.tertiary.main,
        '& span': {
            color: theme.palette.tertiary.main,
        }
    }
}))(Slider);

export const StyledCheckBox = withStyles(theme => ({
    checked: {
        color: theme.palette.tertiary.main
    },
    colorPrimary: {
        color: theme.palette.secondary.main,
        "&.Mui-checked": {
            color: theme.palette.tertiary.main
        }
    }
}))(Checkbox);

const useFormControlLabelStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.secondary.light
    }
}));

export default function StyledCheckBoxWithLabel(props) {
    const {label, name, checkedHandler, checked} = props;
    const classes = useFormControlLabelStyles();
    const handleChange = (event) => {
        checkedHandler(event)
    };

    return (
        <FormControlLabel
            control={<StyledCheckBox checked={checked} name={name} onChange={handleChange} color={'primary'}/>}
            label={label} classes={{root: classes.root}}/>

    )
}
