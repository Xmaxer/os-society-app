import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { StyledTextField } from "../assets/theme/styledComponents"
import Chip from "@material-ui/core/Chip"
import { FormikHelpers } from "formik"

const useStyles = makeStyles((theme) => ({
	chip: {
		"&:hover": {
			backgroundColor: theme.palette.secondary.main,
		},
		marginLeft: 5,
		marginBottom: 5,
	},
	formPrevNameField: {
		width: 300,
		"& svg": {
			color: theme.palette.secondary.light,
		},
	},
	popper: {
		display: "none",
	},
	popupIndicator: {
		display: "none",
	},
	root: {
		maxHeight: 50,
		overflowY: "auto",
		overflowX: "hidden",
	},
}))

export interface INewPlayerPreviousNameFieldProps {
	changeHandler: (
		event: React.ChangeEvent<{}>,
		option: Array<string> | null
	) => void
	value: Array<string>
	fieldHandler?: FormikHelpers<any>["setFieldValue"]
}

function NewPlayerPreviousNameField({
	changeHandler,
	value,
	fieldHandler,
}: INewPlayerPreviousNameFieldProps) {
	const classes = useStyles()

	const onEnter = (
		event: React.KeyboardEvent<HTMLDivElement>,
		currentValues: Array<string>
	) => {
		if (event.key === "Enter") {
			const val = (event.target as HTMLInputElement).value
			if (
				val.length > 0 &&
				val.length <= 20 &&
				currentValues.find(
					(e) => e.toLowerCase() === val.toLowerCase()
				) === undefined
			) {
				const newValue = [...currentValues, val]
				fieldHandler
					? fieldHandler("previousNames", newValue)
					: changeHandler(event, newValue)
			}
		}
	}

	return (
		<Autocomplete
			multiple={true}
			className={classes.root}
			renderInput={(params) => (
				<StyledTextField
					className={classes.formPrevNameField}
					{...params}
					label={"Previous names"}
					onKeyDown={(event) => {
						onEnter(event, value)
					}}
				/>
			)}
			classes={{
				popper: classes.popper,
				popupIndicator: classes.popupIndicator,
			}}
			options={[] as Array<string>}
			getOptionLabel={(option: any) => {
				return option
			}}
			limitTags={2}
			onChange={changeHandler}
			value={value}
			renderTags={(tagValue, getTagProps) =>
				tagValue.map((option, index) => (
					<Chip
						label={option}
						{...getTagProps({
							index,
						})}
						className={classes.chip}
						key={option}
					/>
				))
			}
		/>
	)
}

export default NewPlayerPreviousNameField
