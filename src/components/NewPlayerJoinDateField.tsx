import React from "react"
import {makeStyles, ThemeProvider, useTheme} from "@material-ui/core/styles"
import enGB from "date-fns/locale/en-GB"
import DateFnsAdapter from "@material-ui/pickers/adapter/date-fns"
import {DesktopDatePicker, LocalizationProvider} from "@material-ui/pickers"
import {StyledTextField} from "../assets/theme/styledComponents"
import {createMuiTheme} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
	datePickerTextField: {
		"& label.Mui-focused": {
			color: theme.palette.secondary.main,
		},
		"& label": {
			color: theme.palette.secondary.light,
		},
	},
	datePickerRoot: {
		"&:after": {
			borderBottomColor: theme.palette.secondary.main,
		},
		"&:before": {
			borderBottomColor: theme.palette.secondary.light,
		},
		"&:hover:not($disabled):before": {
			borderBottomColor: theme.palette.primary.light + " !important",
		},
		color: theme.palette.secondary.main,
		"& svg": {
			color: theme.palette.secondary.light,
		},
	},
}))

export interface INewPlayerJoinDateFieldProps {
	changeHandler: (date: Date | null) => void
	value: Date
}

function NewPlayerJoinDateField({
	changeHandler,
	value,
}: INewPlayerJoinDateFieldProps) {
	const classes = useStyles()
	const theme = useTheme()

	const datePickerTheme = createMuiTheme({
		overrides: {
			MuiPickersPopper: {
				paper: {
					backgroundColor: theme.palette.primary.main,
					border: `1px solid ${theme.palette.secondary.light}`,
				},
			},
			MuiPickersCalendarHeader: {
				yearSelectionSwitcher: {
					color: theme.palette.secondary.light,
				},
				monthTitleContainer: {
					color: theme.palette.secondary.light,
				},
			},
			MuiPickersArrowSwitcher: {
				iconButton: {
					backgroundColor: "transparent",
					borderRadius: 0,
					color: theme.palette.secondary.light,
					transition: "background-color,color 200ms",
					"&:hover": {
						backgroundColor: theme.palette.secondary.light,
						color: theme.palette.primary.main,
						transition: "background-color,color 500ms",
					},
					"&.Mui-disabled": {
						color: theme.palette.primary.light,
					},
				},
			},
			MuiPickersCalendar: {
				weekDayLabel: {
					color: theme.palette.secondary.light,
				},
				daysHeader: {
					borderTop: `1px solid ${theme.palette.secondary.light}`,
					borderBottom: `1px solid ${theme.palette.secondary.light}`,
				},
			},
			MuiPickersCalendarView: {
				viewTransitionContainer: {
					overflowY: "hidden",
				},
			},
			MuiPickersDay: {
				dayWithMargin: {
					borderRadius: 0,
					backgroundColor: "transparent",
					color: theme.palette.secondary.light,
					transition: "background-color,color 200ms",
					"&:hover": {
						backgroundColor: theme.palette.secondary.dark,
						color: theme.palette.primary.main,
						transition: "background-color,color 200ms",
					},
					"&.Mui-selected": {
						backgroundColor: `${theme.palette.secondary.light} !important`,
						color: theme.palette.primary.main,
					},
					"&.Mui-selected:hover": {
						backgroundColor: theme.palette.secondary.light,
						color: theme.palette.primary.main,
					},
					"&.Mui-disabled": {
						color: theme.palette.primary.light,
					},
				},
				today: {
					backgroundColor: theme.palette.tertiary.main,
					color: theme.palette.primary.main,
				},
			},
			MuiPickersYear: {
				root: {
					color: theme.palette.secondary.light,
					backgroundColor: "transparent",
					"&:hover": {
						backgroundColor: theme.palette.secondary.light,
						color: theme.palette.primary.main,
					},
				},
			},
		},
	})

	return (
		<LocalizationProvider locale={enGB} dateAdapter={DateFnsAdapter as any}>
			<ThemeProvider theme={datePickerTheme}>
				<DesktopDatePicker
					InputProps={{
						classes: {
							root: classes.datePickerRoot,
						},
					}}
					renderInput={(props) => (
						<StyledTextField
							{...props}
							helperText={null}
							className={classes.datePickerTextField}
						/>
					)}
					label={"Player's Join Date"}
					value={value}
					onChange={changeHandler}
					maxDate={Date.now()}
				/>
			</ThemeProvider>
		</LocalizationProvider>
	)
}

export default NewPlayerJoinDateField
