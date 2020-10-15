import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import PlayersPage from "./PlayersPage"
import CompetitionsPage from "./CompetitionsPage"
import { Route, Switch } from "react-router-dom"
import { COMPETITIONS_ROUTE, PLAYERS_ROUTE } from "../assets/constants/routes"

const useStyles = makeStyles(theme => ({}))

export interface IHomeTabPanelsProps {

}

function HomeTabPanels({}: IHomeTabPanelsProps) {
	const classes = useStyles()

	return (
		<>
			<Switch>
				<Route path={PLAYERS_ROUTE} component={PlayersPage} exact />
				<Route path={COMPETITIONS_ROUTE} component={CompetitionsPage} />
			</Switch>
		</>
	)
}

export default HomeTabPanels
