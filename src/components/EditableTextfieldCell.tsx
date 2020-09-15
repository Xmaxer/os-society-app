import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import TableCell from "@material-ui/core/TableCell"
import ClickAwayListener from "@material-ui/core/ClickAwayListener"
import { MAX_USERNAME_LENGTH } from "../assets/constants/constants"
import NewPlayerUsernameTextField from "./NewPlayerUsernameTextField"
import NewPlayerCommentField from "./NewPlayerCommentField"
import { Tooltip } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
	cellWrapper: {
		height: 70,
		overflow: "hidden",
		display: "flex",
		alignItems: "center",
	},
	text: {
		"-webkit-line-clamp": 3,
		"-webkit-box-orient": "vertical",
		display: "-webkit-box",
		overflow: "hidden",
	},
}))

export interface EditableTextfieldCellProps {
	defaultValue?: string | null
	name: string
	id: string
	multiline?: boolean
	maxLength?: number
	onChange: (name: string, value?: string | null) => void

	[key: string]: any
}

function EditableTextfieldCell({
	defaultValue,
	name,
	id,
	multiline = false,
	maxLength = MAX_USERNAME_LENGTH,
	onChange,
	...rest
}: EditableTextfieldCellProps) {
	const classes = useStyles()

	const [value, setValue] = useState(defaultValue)
	const [edit, setEdit] = useState(false)

	const handleEdit = () => {
		setEdit(true)
	}

	const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			const newValue = (event.target as HTMLInputElement).value
			setEdit(false)
			if (defaultValue !== value) onChange(name, newValue)
		}
	}

	const handleClickAway = () => {
		setEdit(false)
		if (defaultValue !== value) {
			onChange(name, value)
		}
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)
	}

	return (
		<TableCell {...rest} onClick={handleEdit}>
			<div className={classes.cellWrapper}>
				{edit ? (
					<ClickAwayListener
						onClickAway={handleClickAway}
						mouseEvent={"onMouseDown"}>
						<div>
							{multiline ? (
								<NewPlayerCommentField
									changeHandler={handleChange}
									value={value}
								/>
							) : (
								<NewPlayerUsernameTextField
									changeHandler={handleChange}
									value={value}
									onKeyDown={handleSubmit}
								/>
							)}
						</div>
					</ClickAwayListener>
				) : (
					<Tooltip title={defaultValue || ""}>
						<div className={classes.text}>{defaultValue}</div>
					</Tooltip>
				)}
			</div>
		</TableCell>
	)
}

export default EditableTextfieldCell
