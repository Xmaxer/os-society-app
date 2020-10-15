import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { StyledTextField } from "../assets/theme/styledComponents"

const useStyles = makeStyles(() => ({
	formCommentField: {
		width: 300,
		"& *::-webkit-scrollbar": {
			display: "none",
		},
	},
}))

export interface INewPlayerCommentFieldProps {
	changeHandler: (event: React.ChangeEvent<any>) => void
	value?: string | null

	[key: string]: any
}

function NewPlayerCommentField({
	changeHandler,
	value,
	...rest
}: INewPlayerCommentFieldProps) {
	const classes = useStyles()
	return (
		<StyledTextField
			name={"comment"}
			multiline={true}
			inputProps={{maxLength: 200}}
			onChange={changeHandler}
			value={value}
			label={"comment"}
			className={classes.formCommentField}
			rowsMax={1}
			{...rest}
		/>
	)
}

export default NewPlayerCommentField
