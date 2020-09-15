import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import { StyledButton } from "../assets/theme/styledComponents"
import toDate from "date-fns/toDate"
import Dialog from "@material-ui/core/Dialog"
import { Formik } from "formik"
import useApi from "../hooks/useApi"
import {
	CreatePlayer,
	CreatePlayerVariables,
} from "../assets/api/apiInterfaces"
import { CREATE_PLAYER_MUTATION } from "../assets/api/queries"
import { SlideProps } from "@material-ui/core"
import Slide from "@material-ui/core/Slide"
import NewPlayerUsernameTextField from "./NewPlayerUsernameTextField"
import NewPlayerJoinDateField from "./NewPlayerJoinDateField"
import NewPlayerRankField from "./NewPlayerRankField"
import NewPlayerPreviousNameField from "./NewPlayerPreviousNameField"
import NewPlayerCommentField from "./NewPlayerCommentField"

const useStyles = makeStyles((theme) => ({
	formContainer: {
		display: "flex",
		backgroundColor: theme.palette.primary.main,
		padding: 10,
		width: "100%",
		borderTop: "2px solid " + theme.palette.secondary.main,
		height: "100%",
		flexDirection: "column",
		minWidth: "inherit",
		"& > *": {
			marginTop: 20,
		},
	},
	fieldContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		"& > *": {
			marginTop: 20,
		},
		width: "inherit",
	},
	actionContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		"& > button": {
			marginLeft: 20,
		},
		marginRight: 0,
		marginLeft: 0,
	},
	dialogContainer: {
		"& .MuiDialog-paper": {
			overflowX: "hidden",
			backgroundColor: theme.palette.primary.main,
			textAlign: "center",
			"&:first-child": {
				color: theme.palette.secondary.light,
			},
		},
	},
}))

export interface INewPlayerFormDialogProps {
	successHandler: () => void
	cancelHandler: () => void
	open: boolean
}

const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => {
	return <Slide direction="up" ref={ref} {...props} />
})

function NewPlayerFormDialog({
	successHandler,
	open,
	cancelHandler,
}: INewPlayerFormDialogProps) {
	const classes = useStyles()
	const { request } = useApi<CreatePlayer, CreatePlayerVariables>({
		query: CREATE_PLAYER_MUTATION,
	})

	const handleCancel = () => {
		cancelHandler()
	}

	return (
		<Dialog
			fullScreen={true}
			open={open}
			TransitionComponent={Transition}
			className={classes.dialogContainer}>
			<Typography variant={"h5"}>Add a new player</Typography>
			<Formik
				initialValues={{
					username: "",
					joinDate: toDate(Date.now()),
					rank: 0,
					previousNames: [] as Array<string>,
					comment: "",
				}}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					setSubmitting(true)
					request({
						variables: {
							...values,
						},
						handleComplete: () => {
							resetForm()
							setSubmitting(false)
						},
						handleSuccess: successHandler,
					})
				}}
				validate={(values) => {
					const errors: {
						[key: string]: any
					} = {}
					if (!values.username) {
						errors.username = "Invalid username"
					}
					if (!values.rank) {
						errors.rank = "Invalid rank"
					}
					if (!values.joinDate) {
						errors.rank = "Invalid join date"
					}
					return errors
				}}>
				{({
					values,
					handleChange,
					handleSubmit,
					setFieldValue,
					isValid,
				}) => (
					<form
						className={classes.formContainer}
						onSubmit={(event) => {
							event.preventDefault()
							handleSubmit(event)
						}}>
						<div className={classes.fieldContainer}>
							<NewPlayerUsernameTextField
								changeHandler={handleChange}
								value={values.username}
							/>
							<NewPlayerJoinDateField
								changeHandler={(date) => {
									setFieldValue(
										"joinDate",
										date ? toDate(date) : null
									)
								}}
								value={values.joinDate}
							/>
							<NewPlayerRankField
								changeHandler={(event, option) => {
									setFieldValue(
										"rank",
										option ? option.id : null
									)
								}}
							/>
							<NewPlayerPreviousNameField
								changeHandler={(event, option) => {
									setFieldValue("previousName", option)
								}}
								value={values.previousNames}
								fieldHandler={setFieldValue}
							/>
							<NewPlayerCommentField
								changeHandler={handleChange}
								value={values.comment}
							/>
						</div>
						<div className={classes.actionContainer}>
							<StyledButton
								variant={"contained"}
								onClick={(event) =>
									handleSubmit(
										(event as unknown) as React.FormEvent<
											HTMLFormElement
										>
									)
								}
								disabled={!isValid}>
								Save
							</StyledButton>
							<StyledButton
								variant={"contained"}
								onClick={handleCancel}>
								Close
							</StyledButton>
						</div>
					</form>
				)}
			</Formik>
		</Dialog>
	)
}

export default NewPlayerFormDialog
