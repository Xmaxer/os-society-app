import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import {StyledTextField} from "../assets/theme/styledComponents"

const useStyles = makeStyles(() => ({
	formUsernameField: {},
}))

export interface INewPlayerUsernameTextFieldProps {
	changeHandler: (event: React.ChangeEvent<any>) => void
	value?: string | null

	[key: string]: any
}

function NewPlayerUsernameTextField({
	changeHandler,
	value,
	...rest
}: INewPlayerUsernameTextFieldProps) {
	const classes = useStyles()
	return (
		<StyledTextField
			name={"username"}
			autoFocus={true}
			inputProps={{maxLength: 12}}
			onChange={changeHandler}
			value={value}
			label={"username"}
			className={classes.formUsernameField}
			{...rest}
		/>
	)
}

export default NewPlayerUsernameTextField
