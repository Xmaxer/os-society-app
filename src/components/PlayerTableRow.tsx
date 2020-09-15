import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import TableRow from "@material-ui/core/TableRow"
import EditableTextfieldCell from "./EditableTextfieldCell"
import EditableDatePickerCell from "./EditableDatePickerCell"
import EditableAutocompleteCell from "./EditableAutocompleteCell"
import TableCell from "@material-ui/core/TableCell"
import EditableMultiSelectCell from "./EditableMultiSelectCell"
import format from "date-fns/format"
import parseISO from "date-fns/parseISO"
import differenceInDays from "date-fns/differenceInDays"
import useApi from "../hooks/useApi"
import {
	DELETE_PLAYER_MUTATION,
	UPDATE_PLAYER_MUTATION,
} from "../assets/api/queries"
import { StyledIconButton } from "../assets/theme/styledComponents"
import Delete from "@material-ui/icons/Delete"
import Tooltip from "@material-ui/core/Tooltip"
import {
	DeletePlayer,
	DeletePlayerVariables,
	Players_players,
	UpdatePlayer,
	UpdatePlayerVariables,
} from "../assets/api/apiInterfaces"

const useStyles = makeStyles((theme) => ({
	cellWrapper: {
		height: 70,
		overflow: "hidden",
		display: "flex",
		alignItems: "center",
	},
	deleteButton: {
		"&:hover": {
			color: theme.palette.error.light,
		},
	},
}))

function formatDateTimeFromString(datetime: string) {
	return format(parseISO(datetime), "dd/MM/yyyy hh:mm:ss")
}

function computeDays(datetime: string) {
	return differenceInDays(Date.now(), parseISO(datetime)).toString() + " days"
}

export interface PlayerTableRowProps {
	defaultPlayer: Players_players
	onDelete: () => void
}

function PlayerTableRow({ defaultPlayer, onDelete }: PlayerTableRowProps) {
	const classes = useStyles()
	const [player, setPlayer] = useState(defaultPlayer)
	const { request: handlePlayerCall } = useApi<
		UpdatePlayer,
		UpdatePlayerVariables
	>({ query: UPDATE_PLAYER_MUTATION })
	const { request: handleDeletePlayerCall } = useApi<
		DeletePlayer,
		DeletePlayerVariables
	>({ query: DELETE_PLAYER_MUTATION })

	const handleChange = (
		name: string,
		value?: string | null | Array<string> | Date | number
	) => {
		handlePlayerCall({
			variables: { ...player, [name]: value },
			handleSuccess: onEditSuccess,
		})
	}

	const onEditSuccess = (data: UpdatePlayer) => {
		setPlayer(data!.updatePlayer!.player)
	}

	const handleDelete = () => {
		handleDeletePlayerCall({
			variables: { id: player.id },
			handleSuccess: onDeleteSuccess,
		})
	}

	const onDeleteSuccess = () => {
		onDelete()
	}

	return (
		<TableRow key={player.id}>
			<EditableTextfieldCell
				defaultValue={player.username}
				id={player.id}
				name={"username"}
				width={"10%"}
				align={"left"}
				onChange={handleChange}
			/>
			<EditableDatePickerCell
				width={"10%"}
				defaultValue={player.joinDate}
				id={player.id}
				name={"joinDate"}
				onChange={handleChange}
				align={"left"}
			/>
			<EditableAutocompleteCell
				width={"10%"}
				defaultValue={player.rank}
				id={player.id}
				name={"rank"}
				align={"left"}
				onChange={handleChange}
			/>
			<TableCell width={"5%"} align={"left"}>
				<div className={classes.cellWrapper}>
					{computeDays(player.joinDate)}
				</div>
			</TableCell>
			<TableCell width={"10%"} align={"center"}>
				<div className={classes.cellWrapper}>
					{formatDateTimeFromString(player.createdAt)}
				</div>
			</TableCell>
			<TableCell width={"10%"} align={"center"}>
				<div className={classes.cellWrapper}>
					{formatDateTimeFromString(player.updatedAt)}
				</div>
			</TableCell>
			<EditableMultiSelectCell
				width={"20%"}
				defaultValue={player.previousNames}
				id={player.id}
				name={"previousNames"}
				align={"center"}
				onChange={handleChange}
			/>
			<EditableTextfieldCell
				width={"18%"}
				defaultValue={player.comment}
				id={player.id}
				name={"comment"}
				multiline={true}
				maxLength={200}
				align={"left"}
				onChange={handleChange}
			/>
			<TableCell width={"7%"} align={"center"}>
				<div className={classes.cellWrapper}>
					<Tooltip title={"Delete"}>
						<StyledIconButton
							onClick={handleDelete}
							className={classes.deleteButton}>
							<Delete />
						</StyledIconButton>
					</Tooltip>
				</div>
			</TableCell>
		</TableRow>
	)
}

export default PlayerTableRow
