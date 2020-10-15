import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { IRankFilter } from "./RankFilter"
import Paper from "@material-ui/core/Paper"
import PlayerTableToolbar from "./PlayerTableToolbar"
import CompetitionTable from "./CompetitionTable"
import CompetitionTableToolbar from "./CompetitionTableToolbar"

const useStyles = makeStyles(theme => ({
	root: {
		width: "100%",
		height: "100%",
		overflow: "hidden",
	},
	paper: {
		width: "100%",
		marginBottom: theme.spacing(2),
		display: "flex",
		flexDirection: "column",
		height: "100%",
	},
}))

export interface ICompetitionsPageProps {

}

function CompetitionsPage({}: ICompetitionsPageProps) {
	const classes = useStyles()

	const [search, setSearch] = useState<string | undefined>(undefined)

	const handleApplyFilters = (
		search?: string
	) => {
		setSearch(search)
	}

	return (
		<div className={classes.root}>
			<Paper className={classes.paper} square>
				<CompetitionTableToolbar handleApplyFilters={handleApplyFilters} />
				<CompetitionTable/>
			</Paper>
		</div>
	)
}

export default CompetitionsPage
