import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import ClickAwayListener from "@material-ui/core/ClickAwayListener"
import TableCell from "@material-ui/core/TableCell"
import Typography from "@material-ui/core/Typography"
import { RANK_OPTIONS } from "../assets/constants/constants"
import NewPlayerRankField from "./NewPlayerRankField"

const useStyles = makeStyles((theme) => ({
	option: {
		display: "flex",
		alignItems: "center",
	},
	optionText: {
		marginLeft: 5,
	},
	image: {
		width: 15,
	},
	textfield: {
		"& svg": {
			color: theme.palette.secondary.light,
		},
	},
	cellWrapper: {
		height: 70,
		overflow: "hidden",
		display: "flex",
		alignItems: "center",
	},
}))

export interface EditableAutocompleteCellProps {
	defaultValue: number
	name: string
	onChange: (name: string, value: number) => void

	[key: string]: any
}

function EditableAutocompleteCell({
	defaultValue,
	name,
	onChange,
	...rest
}: EditableAutocompleteCellProps) {
	const classes = useStyles()

	const [value, setValue] = useState(
		RANK_OPTIONS.find((e) => e.id === defaultValue)
	)
	const [edit, setEdit] = useState(false)

	const handleEdit = () => {
		setEdit(true)
	}

	const handleChange = (
		event: React.ChangeEvent<Record<string, unknown>>,
		option: typeof RANK_OPTIONS[0] | null
	) => {
		if (option !== null) {
			const newValue = option.id
			setEdit(false)
			setValue(option)
			onChange(name, newValue)
		}
	}

	const handleClickAway = () => {
		setEdit(false)
	}

	const idToLabel = (id?: number) => {
		const item = RANK_OPTIONS.find((e) => e.id === id)
		if (item) {
			return (
				<div className={classes.option}>
					{item.img ? (
						<img
							src={item.img}
							alt={""}
							className={classes.image}
						/>
					) : null}
					<Typography className={classes.optionText}>
						{item.label}
					</Typography>
				</div>
			)
		}
	}

	return (
		<TableCell {...rest} onClick={handleEdit}>
			<div className={classes.cellWrapper}>
				{edit ? (
					<ClickAwayListener onClickAway={handleClickAway}>
						<div>
							<NewPlayerRankField changeHandler={handleChange} />
						</div>
					</ClickAwayListener>
				) : (
					idToLabel(value ? value.id : undefined)
				)}
			</div>
		</TableCell>
	)
}

export default EditableAutocompleteCell
