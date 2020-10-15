import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { StyledIconButton } from "../assets/theme/styledComponents"
import toDate from "date-fns/toDate"
import Tooltip from "@material-ui/core/Tooltip"
import SaveIcon from "@material-ui/icons/Save"
import CloseIcon from "@material-ui/icons/Close"
import { Formik } from "formik"
import useApi from "../hooks/useApi"
import { CreatePlayer, CreatePlayerVariables } from "../assets/api/apiInterfaces"
import { CREATE_PLAYER_MUTATION } from "../assets/api/queries"
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
		minWidth: "1400px",
		"& > *": {
			marginTop: 0,
		},
		borderTop: "2px solid " + theme.palette.secondary.main,
	},
	fieldContainer: {
		display: "flex",
		width: "100%",
		justifyContent: "space-around",
		alignItems: "flex-end",
	},
	actionContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginLeft: "auto",
		marginRight: 20,
	},
	closeIcon: {
		"&:hover": {
			color: theme.palette.error.main,
		},
	},
	saveIcon: {
		"&:hover": {
			color: theme.palette.info.main,
		},
	},
}))

export interface INewPlayerFormProps {
	successHandler: () => void
	cancelHandler: () => void
}

function NewPlayerForm({successHandler, cancelHandler}: INewPlayerFormProps) {
	const classes = useStyles()
	const {request} = useApi<CreatePlayer, CreatePlayerVariables>({
		query: CREATE_PLAYER_MUTATION,
	})

	const handleCancel = () => {
		cancelHandler()
	}

	return (
		<Formik
			initialValues={{
				username: "",
				joinDate: toDate(Date.now()),
				rank: 0,
				previousNames: [] as Array<string>,
				comment: "",
			}}
			onSubmit={(values, {setSubmitting, resetForm}) => {
				setSubmitting(true)
				request({
					variables: {...values},
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
				if (values.rank === null || values.rank === undefined) {
					errors.rank = "Invalid rank"
				}
				if (!values.joinDate) {
					errors.rank = "Invalid join date"
				}
				return errors
			}}
			validateOnMount={true}>
			{({values, handleChange, handleSubmit, setFieldValue, isValid}) => (
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
								setFieldValue("rank", option ? option.id : null)
							}}
						/>
						<NewPlayerPreviousNameField
							changeHandler={(event, option) => {
								setFieldValue("previousNames", option)
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
						<Tooltip title={"Save"}>
							<StyledIconButton
								onClick={(event) =>
									handleSubmit(
										(event as unknown) as React.FormEvent<
											HTMLFormElement
										>
									)
								}
								disabled={!isValid}
								className={classes.saveIcon}>
								<SaveIcon />
							</StyledIconButton>
						</Tooltip>
						<Tooltip title={"Cancel"}>
							<StyledIconButton
								onClick={handleCancel}
								className={classes.closeIcon}>
								<CloseIcon />
							</StyledIconButton>
						</Tooltip>
					</div>
				</form>
			)}
		</Formik>
	)
}

export default NewPlayerForm
