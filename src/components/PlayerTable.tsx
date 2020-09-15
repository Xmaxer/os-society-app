import React, {useCallback, useEffect, useState} from "react"
import {makeStyles, useTheme} from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TablePagination from "@material-ui/core/TablePagination"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import useApi from "../hooks/useApi"
import {PLAYERS_QUERY} from "../assets/api/queries"
import subDays from "date-fns/subDays"
import formatISO from "date-fns/formatISO"
import Skeleton from "@material-ui/lab/Skeleton"
import SortableTableHead, {headers} from "./SortableTableHead"
import TablePaginationOptions from "./TablePaginationOptions"
import PlayerTableRow from "./PlayerTableRow"
import NewPlayerBar from "./NewPlayerBar"
import {IRankFilter} from "./RankFilter"
import {
	OrderEnum,
	PlayerOrderEnum,
	Players,
	Players_players,
	PlayersVariables,
} from "../assets/api/apiInterfaces"
import {useMediaQuery} from "@material-ui/core"
import {PLAYER_ORDER_ENUM} from "../assets/constants/constants"

const useStyles = makeStyles((theme) => ({
	table: {
		minWidth: 500,
		borderCollapse: "separate",
	},
	tableContainer: {
		overflowY: "auto",
		borderRadius: 0,
	},
	tableBody: {
		"& td": {
			color: theme.palette.secondary.light,
			borderColor: theme.palette.secondary.main,
		},

		"& > :nth-of-type(odd)": {
			backgroundColor: theme.palette.primary.dark,
		},
		"& > :nth-of-type(even)": {
			backgroundColor: theme.palette.primary.main,
		},
	},
	tablePagination: {
		backgroundColor: theme.palette.primary.dark,
		overflow: "inherit",
		borderTop: "1px solid " + theme.palette.secondary.main,
	},
	paginationSelectRoot: {
		"& *": {
			color: theme.palette.secondary.light,
		},
		color: theme.palette.secondary.light,
		"&:hover": {
			color: theme.palette.secondary.main,
			"& *": {
				color: theme.palette.secondary.main,
			},
		},
		"&:focus": {
			color: theme.palette.secondary.main,
			"& *": {
				color: theme.palette.secondary.main,
			},
		},
	},
	paginationCaption: {
		color: theme.palette.secondary.light,
	},
	paginationSpacer: {
		flex: "inherit",
	},
	paginationToolbar: {
		display: "flex",
		justifyContent: "center",
	},
	skeleton: {
		backgroundColor: theme.palette.secondary.light,
	},
	fabContainer: {
		position: "fixed",
		right: 0,
		bottom: 0,
		marginRight: 20,
		marginBottom: 60,
	},
}))

const rowsPerPageOptions = [25, 50, 75, 100]

export interface IPlayerTableProps {
	days?: Array<number>
	ranks?: IRankFilter
	search?: string
}

function PlayerTable({days, ranks, search}: IPlayerTableProps) {
	const theme = useTheme()
	const matches = useMediaQuery(theme.breakpoints.down("xs"))
	const classes = useStyles()
	const [order, setOrder] = useState(OrderEnum.DESC)
	const [orderBy, setOrderBy] = useState<PLAYER_ORDER_ENUM | PlayerOrderEnum>(
		PlayerOrderEnum.CREATED_AT
	)
	const [page, setPage] = React.useState(0)
	const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0])
	const [players, setPlayers] = useState<Array<Players_players>>([])
	const [totalPlayers, setTotalPlayers] = useState(0)
	const {request, loading} = useApi<Players, PlayersVariables>({
		query: PLAYERS_QUERY,
	})

	const handleGetPlayersSuccess = (data: Players) => {
		setPlayers(data.players)
		setTotalPlayers(data.totalPlayers)
	}

	const getPlayers = useCallback(() => {
		let convertedRanks: Array<number> | null = null
		let start_join_date = null
		let end_join_date = null

		if (ranks) {
			convertedRanks =
				ranks &&
				(Object.entries(ranks)
					.map((rank, i) => {
						if (rank[1]) return i
						else return undefined
					})
					.filter((rank) => rank !== undefined) as Array<number>)
		}

		if (days && days[0] !== 0)
			start_join_date = formatISO(subDays(Date.now(), days[0]))
		if (days && days[1] !== 2000)
			end_join_date = formatISO(subDays(Date.now(), days[1]))

		let convertedOrderBy: PlayerOrderEnum = orderBy as PlayerOrderEnum
		if (orderBy === PLAYER_ORDER_ENUM.DAYS_IN_CC) {
			convertedOrderBy = PlayerOrderEnum.JOIN_DATE
		}

		request({
			variables: {
				order: order,
				orderBy: convertedOrderBy,
				first: rowsPerPage,
				skip: page * rowsPerPage,
				rankContains: convertedRanks,
				usernameOrPreviousNameContains: search,
				startJoinDate: start_join_date,
				endJoinDate: end_join_date,
			},
			handleSuccess: handleGetPlayersSuccess,
		})
	}, [days, order, orderBy, page, ranks, request, rowsPerPage, search])

	const handleSort = (id: PlayerOrderEnum | PLAYER_ORDER_ENUM) => {
		setOrder(
			orderBy === id && order === OrderEnum.ASC
				? OrderEnum.DESC
				: OrderEnum.ASC
		)
		setPage(0)
		setOrderBy(id)
	}

	useEffect(() => {
		setPage(0)
	}, [days, ranks, search])

	useEffect(() => {
		getPlayers()
	}, [orderBy, order, page, rowsPerPage, days, ranks, search, getPlayers])

	const handlePageChange = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setPage(newPage)
	}

	const handleRowsPerPageChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10))
	}

	const handleAddNewPlayer = () => {
		getPlayers()
	}

	const handleDeletePlayer = () => {
		getPlayers()
	}
	return (
		<>
			<TableContainer
				component={Paper}
				className={classes.tableContainer}>
				<Table size={"small"} className={classes.table}>
					<SortableTableHead
						orderBy={orderBy}
						order={order}
						handleSort={handleSort}
					/>
					<TableBody className={classes.tableBody}>
						{loading
							? [...Array(rowsPerPage)].map((e, i) => {
									return (
										<TableRow key={i}>
											<TableCell
												width={"100%"}
												colSpan={headers.length}>
												<Skeleton
													className={classes.skeleton}
												/>
											</TableCell>
										</TableRow>
									)
							  })
							: players.map((player, index) => {
									return (
										<PlayerTableRow
											defaultPlayer={player}
											key={index}
											onDelete={handleDeletePlayer}
										/>
									)
							  })}
						{!loading && players && players.length < rowsPerPage && (
							<TableRow>
								<TableCell colSpan={headers.length}>
									<div
										style={{
											height:
												(rowsPerPage - players.length) *
													40 +
												"px",
										}}
									/>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<NewPlayerBar handleAddNewPlayer={handleAddNewPlayer} />
			<TablePagination
				rowsPerPage={rowsPerPage}
				rowsPerPageOptions={rowsPerPageOptions}
				count={totalPlayers}
				page={page}
				onChangePage={handlePageChange}
				onChangeRowsPerPage={handleRowsPerPageChange}
				labelRowsPerPage={!matches ? "Rows per page:" : ""}
				ActionsComponent={TablePaginationOptions}
				className={classes.tablePagination}
				classes={{
					selectRoot: classes.paginationSelectRoot,
					caption: classes.paginationCaption,
					spacer: classes.paginationSpacer,
					toolbar: classes.paginationToolbar,
				}}
				component={"div"}
			/>
		</>
	)
}

export default PlayerTable
