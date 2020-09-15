import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import {BrowserRouter, Route, Switch} from "react-router-dom"
import {
	API_OFFLINE_ERROR,
	CHANGE_PASSWORD_ROUTE,
	HOME_ROUTE,
	LOGIN_ROUTE,
} from "./assets/constants/routes"
import HomePage from "./pages/HomePage"
import ChangePasswordPage from "./pages/ChangePasswordPage"
import LoginPage from "./pages/LoginPage"
import ApiDownPage from "./pages/ApiDownPage"
import ErrorSnackbar from "./components/ErrorSnackbar"
import InformationSnackbar from "./components/InformationSnackbar"
import {IUser} from "./App"

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		height: "100%",
		"& *::-webkit-scrollbar": {
			backgroundColor: theme.palette.secondary.light,
		},
		"& *::-webkit-scrollbar-thumb": {
			backgroundColor: theme.palette.primary.light,
		},
	},
}))

export interface IAppRouterProps {
	state?: {
		user: IUser
	}
}

function AppRouter({state}: IAppRouterProps) {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<BrowserRouter>
				<>
					<Switch>
						<Route path={HOME_ROUTE} component={HomePage} exact />
						<Route
							path={CHANGE_PASSWORD_ROUTE}
							component={ChangePasswordPage}
							exact
							{...state}
						/>
						<Route path={LOGIN_ROUTE} component={LoginPage} exact />
						<Route
							path={API_OFFLINE_ERROR}
							component={ApiDownPage}
							exact
						/>
					</Switch>
					<ErrorSnackbar />
					<InformationSnackbar />
				</>
			</BrowserRouter>
		</div>
	)
}

export default AppRouter
