import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { StyledTab, StyledTabs } from "../assets/theme/styledComponents"
import { COMPETITIONS_ROUTE, PLAYERS_ROUTE } from "../assets/constants/routes"
import { useHistory } from "react-router-dom"

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%'
	}
}))

export interface IHomeTabsProps {

}

interface ILinkTabProps {
	label: string,
	href: string
}

function HomeTabs({}: IHomeTabsProps) {
	const classes = useStyles()
	const [value, setValue] = useState(0)
	const history = useHistory()

	const handleTabChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
		setValue(newValue)
		switch (newValue) {
			case 0:
				history.push(PLAYERS_ROUTE)
				break
			case 1:
				history.push(COMPETITIONS_ROUTE)
				break
			default:
				history.push(PLAYERS_ROUTE)
		}
	}

	useEffect(() => {
		switch(history.location.pathname) {
			case PLAYERS_ROUTE:
				setValue(0)
				break;
			case COMPETITIONS_ROUTE:
				setValue(1)
				break;
			default:
				setValue(0)
		}
	}, [history.location.pathname, setValue])

	return (
		<div className={classes.root}>
			<StyledTabs value={value} onChange={handleTabChange}>
				<StyledTab label={"Players"}/>
				<StyledTab label={"Competition"}/>
			</StyledTabs>
		</div>
	)
}

export default HomeTabs
