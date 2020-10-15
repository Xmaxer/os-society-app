import React from "react"
import { Button, Slider, Tab, Tabs, TextField } from "@material-ui/core"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import IconButton from "@material-ui/core/IconButton"

export const StyledButton = withStyles((theme) => ({
	text: {
		color: theme.palette.secondary.light,
		"&:hover": {
			color: theme.palette.primary.main,
			backgroundColor: theme.palette.secondary.main,
		},
	},
	outlined: {
		borderWidth: 1,
		borderColor: theme.palette.secondary.light,
		borderStyle: "none solid none solid",
		borderRadius: 0,
		height: "100%",
		color: theme.palette.secondary.light,
		backgroundColor: "transparent",
		transition: "background-color,border-color,color 300ms",
		"&:hover": {
			backgroundColor: theme.palette.secondary.light,
			color: theme.palette.primary.dark,
			borderColor: theme.palette.primary.dark,
			transition: "background-color,border-color,color 300ms",
		},
		"&:active": {
			backgroundColor: theme.palette.secondary.dark,
			color: theme.palette.primary.dark,
			borderColor: theme.palette.primary.dark,
			transition: "background-color,border-color,color 300ms",
		},
	},
	contained: {
		"&:hover": {
			backgroundColor: theme.palette.secondary.main,
		},
		"&.Mui-disabled": {
			backgroundColor: theme.palette.secondary.dark,
			color: theme.palette.primary.light,
		},
	},
}))(Button)

export const StyledTextField = withStyles((theme) => ({
	root: {
		"& .MuiInput-underline:after": {
			borderBottomColor: theme.palette.secondary.main,
		},
		"& .MuiInput-underline:before": {
			borderBottomColor: theme.palette.secondary.light,
		},
		"& .MuiInput-underline:hover:before": {
			borderBottomColor: theme.palette.secondary.dark,
		},
		"& .MuiInput-root": {
			color: theme.palette.secondary.main,
		},
		"& label.Mui-focused": {
			color: theme.palette.secondary.main,
		},
		"& label": {
			color: theme.palette.secondary.light,
		},
	},
}))(TextField)

export const StyledSlider = withStyles((theme) => ({
	valueLabel: {
		top: 22,
		"& *": {
			background: "transparent",
			color: theme.palette.secondary.dark,
		},
	},
	colorPrimary: {
		color: theme.palette.secondary.dark,
	},
	active: {
		color: theme.palette.secondary.main,
		"& span": {
			color: theme.palette.secondary.main,
		},
	},
}))(Slider)

export const StyledCheckBox = withStyles((theme) => ({
	checked: {
		color: theme.palette.secondary.main,
	},
	colorPrimary: {
		color: theme.palette.secondary.dark,
		"&.Mui-checked": {
			color: theme.palette.secondary.main,
		},
	},
}))(Checkbox)

export const StyledIconButton = withStyles((theme) => ({
	root: {
		color: theme.palette.secondary.light,
		"&:hover": {
			color: theme.palette.tertiary.main,
			backgroundColor: "transparent",
		},
	},
}))(IconButton)

export const StyledTab = withStyles((theme) => ({
	root: {
		"&:hover": {
			backgroundColor: theme.palette.secondary.main
		}
	},
}))(Tab)

export const StyledTabs = withStyles((theme) => ({
	root: {
		height: '100%'
	},
	flexContainer: {
		height: '100%'
	},
	indicator: {

	}
}))(Tabs)

const useFormControlLabelStyles = makeStyles((theme) => ({
	root: {
		color: theme.palette.secondary.dark,
	},
}))

export interface IStyledCheckBoxWithLabelProps {
	label: string
	name: string
	checkedHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
	checked: boolean
}

export default function StyledCheckBoxWithLabel({
	label,
	name,
	checkedHandler,
	checked,
}: IStyledCheckBoxWithLabelProps) {
	const classes = useFormControlLabelStyles()
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		checkedHandler(event)
	}

	return (
		<FormControlLabel
			control={
				<StyledCheckBox
					checked={checked}
					name={name}
					onChange={handleChange}
					color={"primary"}
				/>
			}
			label={label}
			classes={{root: classes.root}}
		/>
	)
}
