import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import { StyledButton } from "../assets/theme/styledComponents"
import useApi from "../hooks/useApi"
import { LOGOUT_MUTATION } from "../assets/api/queries"
import { useHistory } from "react-router-dom"
import { LOGIN_ROUTE } from "../assets/constants/routes"
import { Logout } from "../assets/api/apiInterfaces"

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	appbar: {
		height: 80,
	},
	logo: {
		height: "100%",
		marginLeft: "auto",
	},
	logoutButton: {
		marginLeft: "auto",
		marginRight: 20,
	},
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
	},
}))

function Header() {
	const classes = useStyles()
	const history = useHistory()
	const { request } = useApi<Logout>({ query: LOGOUT_MUTATION })

	const handleLogout = () => {
		request({ handleSuccess: handleSuccess })
	}

	const handleSuccess = (data: Logout) => {
		if (data && data.logout && data.logout.success)
			history.push(LOGIN_ROUTE)
	}

	return (
		<AppBar position={"static"} className={classes.appbar}>
			<Toolbar className={classes.toolbar}>
				<img
					src={"/images/oss-logo-large.png"}
					alt={"OSS Logo"}
					className={classes.logo}
				/>
				<StyledButton
					className={classes.logoutButton}
					onClick={handleLogout}
					variant={"text"}>
					Logout
				</StyledButton>
			</Toolbar>
		</AppBar>
	)
}

export default Header
