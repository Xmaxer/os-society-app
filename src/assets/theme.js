import {createMuiTheme} from '@material-ui/core/styles';
import palette from './colours';

const generatedPalette = createMuiTheme({
    palette: {
        primary: {
            main: palette.primary
        },
        secondary: {
            main: palette.secondary
        },
        tertiary: {
            main: palette.tertiary
        },
        error: {
            main: palette.error
        },
        success: {
            main: palette.success
        },
        contrastThreshold: 3,
        tonalOffset: 0.2
    }
});

const theme = createMuiTheme({
    ...generatedPalette,
    spacing: 5,
    props: {
        MuiGrid: {
            container: {
                backgroundColor: generatedPalette.palette.secondary.main
            }
        }
    },
    overrides: {
        MuiDivider: {
            root: {
                backgroundColor: generatedPalette.palette.tertiary.main
            }

        },
        MuiTextField: {
            root: {
                '& .MuiInput-underline:after': {
                    borderBottomColor: generatedPalette.palette.tertiary.main
                },
                '& .MuiInput-underline:before': {
                    borderBottomColor: generatedPalette.palette.secondary.light
                },
                '& .MuiInput-underline:hover:before': {
                    borderBottomColor: generatedPalette.palette.secondary.dark
                },
                '& .MuiInput-root': {
                    color: generatedPalette.palette.tertiary.main
                },
                '& label.Mui-focused': {
                    color: generatedPalette.palette.tertiary.main
                },
                '& label': {
                    color: generatedPalette.palette.secondary.light
                },
            }
        },
        MuiButton: {
            contained: {
                '&:hover': {
                    backgroundColor: generatedPalette.palette.tertiary.main
                }
            }
        }
    }
});

export default theme;
