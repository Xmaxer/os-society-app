import React from 'react';
import {Button, Slider, TextField} from '@material-ui/core'
import {makeStyles, withStyles} from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';

export const StyledButton = withStyles(theme => ({
    text: {
        color: theme.palette.secondary.light,
        '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.secondary.main
        }
    },
    contained: {
        '&:hover': {
            backgroundColor: theme.palette.secondary.main
        }
    }
}))(Button);

export const StyledTextField = withStyles(theme => ({
    root: {
        '& .MuiInput-underline:after': {
            borderBottomColor: theme.palette.secondary.main
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: theme.palette.secondary.light
        },
        '& .MuiInput-underline:hover:before': {
            borderBottomColor: theme.palette.secondary.dark
        },
        '& .MuiInput-root': {
            color: theme.palette.secondary.main
        },
        '& label.Mui-focused': {
            color: theme.palette.secondary.main
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
            color: theme.palette.secondary.dark
        },
    },
    colorPrimary: {
        color: theme.palette.secondary.dark
    },
    active: {
        color: theme.palette.secondary.main,
        '& span': {
            color: theme.palette.secondary.main,
        }
    }
}))(Slider);

export const StyledCheckBox = withStyles(theme => ({
    checked: {
        color: theme.palette.secondary.main
    },
    colorPrimary: {
        color: theme.palette.secondary.dark,
        "&.Mui-checked": {
            color: theme.palette.secondary.main
        }
    }
}))(Checkbox);

export const StyledIconButton = withStyles(theme => ({
    root: {
        color: theme.palette.secondary.light,
        '&:hover': {
            color: theme.palette.secondary.main,
            backgroundColor: 'transparent'
        }
    }
}))(IconButton);

const useFormControlLabelStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.secondary.dark
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
