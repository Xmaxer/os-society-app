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
                backgroundColor: generatedPalette.palette.secondary.main
            }
        },
        MuiPickersDate: {
            root: {
                color: generatedPalette.palette.secondary.main
            }
        }
    },
});

export default theme;
