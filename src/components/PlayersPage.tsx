import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import PlayerTableToolbar from "./PlayerTableToolbar"
import PlayerTable from "./PlayerTable"
import { IRankFilter } from "./RankFilter"

const useStyles = makeStyles((theme) => ({
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

function PlayersPage() {
	const classes = useStyles()
	const [days, setDays] = useState<Array<number> | undefined>(undefined)
	const [ranks, setRanks] = useState<IRankFilter | undefined>(undefined)
	const [search, setSearch] = useState<string | undefined>(undefined)

	const handleApplyFilters = (
		days?: Array<number>,
		ranks?: IRankFilter,
		search?: string
	) => {
		setDays(days)
		setRanks(ranks)
		setSearch(search)
	}

	return (
		<div className={classes.root}>
			<Paper className={classes.paper} square>
				<PlayerTableToolbar handleApplyFilters={handleApplyFilters} />
				<PlayerTable days={days} ranks={ranks} search={search} />
			</Paper>
		</div>
	)
}

export default PlayersPage
