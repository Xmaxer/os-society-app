import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { StyledTextField } from "../assets/theme/styledComponents"
import { RANK_OPTIONS } from "../assets/constants/constants"
import Autocomplete from "@material-ui/lab/Autocomplete"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles((theme) => ({
	formRankField: {
		width: 150,
		"& svg": {
			color: theme.palette.secondary.light,
		},
	},
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
	paper: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.secondary.light,
		border: `1px solid ${theme.palette.secondary.light}`,
	},
	paperOption: {
		"&:hover": {
			backgroundColor: theme.palette.secondary.main,
			color: theme.palette.primary.main,
		},
	},
}))

export interface INewPlayerRankFieldProps {
	changeHandler: (
		event: React.ChangeEvent<Record<string, unknown>>,
		option: typeof RANK_OPTIONS[0] | null
	) => void
}

function NewPlayerRankField({ changeHandler }: INewPlayerRankFieldProps) {
	const classes = useStyles()

	const getOptionLabel = (option: typeof RANK_OPTIONS[0]) => {
		return option.label
	}

	const renderOption = (option: typeof RANK_OPTIONS[0]) => {
		return <React.Fragment>{idToLabel(option.id)}</React.Fragment>
	}

	const idToLabel = (id: number) => {
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
		<Autocomplete
			renderInput={(params) => (
				<StyledTextField
					className={classes.formRankField}
					{...params}
					label={"Rank"}
				/>
			)}
			options={RANK_OPTIONS}
			getOptionLabel={getOptionLabel}
			onChange={changeHandler}
			renderOption={renderOption}
			defaultValue={RANK_OPTIONS.find((e) => e.id === 0)}
			classes={{
				paper: classes.paper,
				option: classes.paperOption,
			}}
		/>
	)
}

export default NewPlayerRankField
