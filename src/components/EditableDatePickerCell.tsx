import React, {useState} from "react"
import {makeStyles} from "@material-ui/core/styles"
import TableCell from "@material-ui/core/TableCell"
import parseISO from "date-fns/parseISO"
import format from "date-fns/format"
import ClickAwayListener from "@material-ui/core/ClickAwayListener"
import NewPlayerJoinDateField from "./NewPlayerJoinDateField"

const useStyles = makeStyles(() => ({
	cellWrapper: {
		height: 70,
		overflow: "hidden",
		display: "flex",
		alignItems: "center",
	},
}))

function formatDate(datetime: string) {
	return format(parseISO(datetime), "dd/MM/yyyy")
}

export interface EditableDatePickerCellProps {
	defaultValue: string
	name: string
	onChange: (name: string, value: Date) => void

	[key: string]: any
}

function EditableDatePickerCell({
	defaultValue,
	name,
	onChange,
	...rest
}: EditableDatePickerCellProps) {
	const classes = useStyles()

	const [value, setValue] = useState(parseISO(defaultValue))
	const [edit, setEdit] = useState(false)

	const handleEdit = () => {
		setEdit(true)
	}

	const handleChange = (date: Date | null) => {
		const newValue = date
		setEdit(false)
		setValue(newValue as Date)
		onChange(name, newValue as Date)
	}

	const handleClickAway = () => {
		setEdit(false)
	}

	return (
		<TableCell {...rest} onClick={handleEdit}>
			<div className={classes.cellWrapper}>
				{edit ? (
					<ClickAwayListener onClickAway={handleClickAway}>
						<div>
							<NewPlayerJoinDateField
								changeHandler={handleChange}
								value={value}
							/>
						</div>
					</ClickAwayListener>
				) : (
					formatDate(defaultValue)
				)}
			</div>
		</TableCell>
	)
}

export default EditableDatePickerCell
