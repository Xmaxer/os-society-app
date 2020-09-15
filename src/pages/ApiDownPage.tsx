import React from "react"
import { useHistory } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import { StyledButton } from "../assets/theme/styledComponents"
import { HOME_ROUTE } from "../assets/constants/routes"

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		alignItems: "center",
		marginLeft: "auto",
		marginRight: "auto",
		flexDirection: "column",
		justifyContent: "center",
		width: "100%",
		height: "100%",
		backgroundColor: theme.palette.primary.main,
	},
	background: {
		backgroundColor: theme.palette.primary.main,
		height: "100%",
		width: "100%",
	},
	textContainer: {
		display: "flex",
		marginBottom: 30,
		alignItems: "center",
		"& > *": {
			color: theme.palette.secondary.main,
			marginLeft: 20,
		},
	},
}))

function ApiDownPage() {
	const classes = useStyles()
	const history = useHistory()

	const handleOnRetry = () => {
		history.push(HOME_ROUTE)
	}

	return (
		<div className={classes.container}>
			<div className={classes.textContainer}>
				<img src={"/svgs/sad_face.svg"} alt={"Sad face"} />
				<Typography variant={"h3"}>API is offline</Typography>
			</div>
			<div>
				<StyledButton onClick={handleOnRetry}>Retry Connection</StyledButton>
			</div>
		</div>
	)
}

export default ApiDownPage
