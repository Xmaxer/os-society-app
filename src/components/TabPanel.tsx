import React from "react"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
	root: {
		minHeight: 0
	}
}))

export interface ITabPanelProps {
	children: React.ReactNode
	value: number
	index: number
}

function TabPanel(props: ITabPanelProps) {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			{props.value === props.index && props.children}
		</div>
	)
}

export default TabPanel
