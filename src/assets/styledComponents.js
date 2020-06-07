import {Button, TextField, Slider} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles';

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

}))(Slider);
