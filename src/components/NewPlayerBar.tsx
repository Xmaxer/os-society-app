import React, { useState } from "react"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import { StyledButton } from "../assets/theme/styledComponents"
import { useMediaQuery } from "@material-ui/core"
import NewPlayerForm from "./NewPlayerForm"
import NewPlayerFormDialog from "./NewPlayerFormDialog"

const useStyles = makeStyles((theme) => ({
	thead: {
		"& th": {
			position: "sticky",
			top: 0,
			zIndex: 1000,
			backgroundColor: theme.palette.primary.main,
			color: theme.palette.secondary.light,
			"& .MuiTableSortLabel-active": {
				color: theme.palette.secondary.main,
			},
			borderColor: theme.palette.secondary.main,
		},
	},
	sortLabel: {
		"&:hover": {
			color: theme.palette.secondary.main,
		},
		"&:focus": {
			color: theme.palette.secondary.main,
		},
	},
	sortLabelActive: {
		color: theme.palette.secondary.main + " !important",
	},
	addNewHeader: {
		textAlign: "center",
		backgroundColor: theme.palette.primary.main,
		display: "flex",
		justifyContent: "center",
		height: 70,
		borderTop: "2px solid " + theme.palette.secondary.main,
	},
}))

export interface INewPlayerBarProps {
	handleAddNewPlayer: () => void
}

function NewPlayerBar({ handleAddNewPlayer }: INewPlayerBarProps) {
	const [edit, setEdit] = useState(false)
	const theme = useTheme()
	const matches = useMediaQuery(theme.breakpoints.down("md"))

	const classes = useStyles()

	const handleNewPlayerClick = () => {
		setEdit(true)
	}

	const handleCancel = () => {
		setEdit(false)
	}

	const handleSuccess = () => {
		handleAddNewPlayer()
		setEdit(false)
	}

	return (
		<div className={classes.addNewHeader}>
			{edit ? (
				!matches ? (
					<NewPlayerForm
						successHandler={handleSuccess}
						cancelHandler={handleCancel}
					/>
				) : (
					<NewPlayerFormDialog
						successHandler={handleSuccess}
						open={edit && matches}
						cancelHandler={handleCancel}
					/>
				)
			) : (
				<StyledButton
					onClick={handleNewPlayerClick}
					variant={"outlined"}>
					Click here to add a new player
				</StyledButton>
			)}
		</div>
	)
}

export default NewPlayerBar
