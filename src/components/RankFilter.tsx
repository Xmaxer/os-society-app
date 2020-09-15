import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import StyledCheckBoxWithLabel from "../assets/theme/styledComponents"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		justifyContent: "flex-start",
		flexDirection: "column",
		[theme.breakpoints.down("md")]: {
			alignItems: "center",
		},
	},
	label: {
		color: theme.palette.secondary.main,
	},
	checkboxContainer: {
		color: theme.palette.secondary.dark,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 5,
		"& > *": {
			marginRight: 10,
		},
		flexWrap: "wrap",
	},
}))

export interface IRankFilterProps {
	handler: (ranks: IRankFilter) => void
	reset?: boolean

	[key: string]: any
}

export interface IRankFilter {
	unranked: boolean
	friend: boolean
	recruit: boolean
	corporal: boolean
	sergeant: boolean
	lieutenant: boolean
	captain: boolean
	general: boolean
	owner: boolean
}

function RankFilter({ handler, reset, ...rest }: IRankFilterProps) {
	const classes = useStyles()

	const [checked, setChecked] = useState<IRankFilter>({
		unranked: true,
		friend: true,
		recruit: true,
		corporal: true,
		sergeant: true,
		lieutenant: true,
		captain: true,
		general: true,
		owner: true,
	})

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = { ...checked, [event.target.name]: event.target.checked }
		setChecked(newValue)
		handler(newValue)
	}

	useEffect(() => {
		if (reset) {
			setChecked({
				unranked: true,
				friend: true,
				recruit: true,
				corporal: true,
				sergeant: true,
				lieutenant: true,
				captain: true,
				general: true,
				owner: true,
			})
		}
	}, [reset])

	return (
		<div className={classes.container} {...rest}>
			<Typography className={classes.label}>Rank Filter</Typography>
			<div className={classes.checkboxContainer}>
				<StyledCheckBoxWithLabel
					name={"unranked"}
					checkedHandler={handleChange}
					checked={checked.unranked}
					label={"Unranked"}
				/>
				<StyledCheckBoxWithLabel
					name={"friend"}
					checkedHandler={handleChange}
					checked={checked.friend}
					label={"Friend"}
				/>
				<StyledCheckBoxWithLabel
					name={"recruit"}
					checkedHandler={handleChange}
					checked={checked.recruit}
					label={"Recruit"}
				/>
				<StyledCheckBoxWithLabel
					name={"corporal"}
					checkedHandler={handleChange}
					checked={checked.corporal}
					label={"Corporal"}
				/>
				<StyledCheckBoxWithLabel
					name={"sergeant"}
					checkedHandler={handleChange}
					checked={checked.sergeant}
					label={"Sergeant"}
				/>
				<StyledCheckBoxWithLabel
					name={"lieutenant"}
					checkedHandler={handleChange}
					checked={checked.lieutenant}
					label={"Lieutenant"}
				/>
				<StyledCheckBoxWithLabel
					name={"captain"}
					checkedHandler={handleChange}
					checked={checked.captain}
					label={"Captain"}
				/>
				<StyledCheckBoxWithLabel
					name={"general"}
					checkedHandler={handleChange}
					checked={checked.general}
					label={"General"}
				/>
				<StyledCheckBoxWithLabel
					name={"owner"}
					checkedHandler={handleChange}
					checked={checked.owner}
					label={"Owner"}
				/>
			</div>
		</div>
	)
}

export default RankFilter
