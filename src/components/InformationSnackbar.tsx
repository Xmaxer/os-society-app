import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { useGlobalState } from "../state/state"
import { REMOVE_INFO } from "../state/actions"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert"
import { SUCCESS } from "../assets/constants/severities"

const useStyles = makeStyles((theme) => ({}))

function Alert(props: { [key: string]: any }) {
	return <MuiAlert elevation={6} variant="filled" {...props} />
}

function InformationSnackbar() {
	const [{ info }, dispatch] = useGlobalState()

	const onClose = () => {
		dispatch({ type: REMOVE_INFO })
	}

	return (
		<Snackbar
			open={info && !!info.message}
			onClose={onClose}
			autoHideDuration={5000}>
			<Alert
				severity={info && info.type ? info.type : SUCCESS}
				onClose={onClose}>
				{info && info.message ? info.message : ""}
			</Alert>
		</Snackbar>
	)
}

export default InformationSnackbar
