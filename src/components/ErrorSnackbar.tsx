import React from "react"
import { useGlobalState } from "../state/state"
import Snackbar from "@material-ui/core/Snackbar"
import { REMOVE_ERRORS } from "../state/actions"
import MuiAlert from "@material-ui/lab/Alert"
import { ERROR } from "../assets/constants/severities"

function Alert(props: { [key: string]: any }) {
	return <MuiAlert elevation={6} variant="filled" {...props} />
}

function ErrorSnackbar() {
	const [{ errors }, dispatch] = useGlobalState()

	const onClose = () => {
		dispatch({ type: REMOVE_ERRORS })
	}
	return (
		<>
			<Snackbar
				open={errors && !!errors.fetchError}
				onClose={onClose}
				autoHideDuration={5000}>
				<Alert severity={ERROR} onClose={onClose}>
					{errors && errors.fetchError
						? errors.fetchError.message
						: ""}
				</Alert>
			</Snackbar>
			<Snackbar
				open={errors && !!errors.graphQLErrors}
				onClose={onClose}
				autoHideDuration={5000}>
				<Alert severity={ERROR} onClose={onClose}>
					{errors && errors.graphQLErrors
						? errors.graphQLErrors.map((m) => m.message + "\n")
						: ""}
				</Alert>
			</Snackbar>
			<Snackbar
				open={errors && !!errors.httpError}
				onClose={onClose}
				autoHideDuration={5000}>
				<Alert severity={ERROR} onClose={onClose}>
					{errors && errors.httpError
						? errors.httpError.statusText
						: ""}
				</Alert>
			</Snackbar>
		</>
	)
}

export default ErrorSnackbar
