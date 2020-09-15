import {createMuiTheme} from "@material-ui/core/styles"
import palette from "./colours"
import {MuiPickersComponentsToClassName} from "@material-ui/pickers/typings/overrides"
import {PaletteColorOptions} from "@material-ui/core"
import {PaletteColor} from "@material-ui/core/styles/createPalette"

declare module "@material-ui/core/styles/overrides" {
	export interface ComponentNameToClassKey
		extends MuiPickersComponentsToClassName {}
}

declare module "@material-ui/core/styles/createPalette" {
	export interface Palette {
		tertiary: PaletteColor
	}

	export interface PaletteOptions {
		tertiary?: PaletteColorOptions
	}
}

const generatedPalette = createMuiTheme({
	palette: {
		primary: palette.primary,
		secondary: palette.secondary,
		tertiary: palette.tertiary,
		error: {
			main: palette.error,
		},
		success: {
			main: palette.success,
		},
		info: {
			main: palette.info,
		},
		contrastThreshold: 3,
		tonalOffset: 0.2,
	},
})

const theme = createMuiTheme({
	...generatedPalette,
	spacing: 5,
	overrides: {
		MuiDivider: {
			root: {
				backgroundColor: generatedPalette.palette.secondary.main,
			},
		},
		MuiGrid: {
			container: {
				backgroundColor: generatedPalette.palette.secondary.main,
			},
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 960,
			lg: 1400,
			xl: 1920,
		},
	},
	props: {
		MuiButtonBase: {
			disableRipple: true,
		},
	},
})

export default theme
