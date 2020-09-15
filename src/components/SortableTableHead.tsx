import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import TableCell, { TableCellProps } from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import TableHead from "@material-ui/core/TableHead"
import TableSortLabel, {
	TableSortLabelTypeMap,
} from "@material-ui/core/TableSortLabel"
import { OrderEnum, PlayerOrderEnum } from "../assets/api/apiInterfaces"
import { PLAYER_ORDER_ENUM } from "../assets/constants/constants"

const useStyles = makeStyles((theme) => ({
	thead: {
		"& th": {
			position: "sticky",
			top: 0,
			zIndex: 1000,
			backgroundColor: theme.palette.primary.main,
			color: theme.palette.secondary.light,
			"& .MuiTableSortLabel-active": {
				color: theme.palette.secondary.main,
			},
			borderColor: theme.palette.secondary.main,
			fontWeight: "bold",
		},
	},
	actionContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	sortLabel: {
		"&:hover": {
			color: theme.palette.secondary.main,
		},
		"&:focus": {
			color: theme.palette.secondary.main,
		},
	},
	sortLabelActive: {
		color: theme.palette.secondary.main + " !important",
	},
	addNewHeader: {
		textAlign: "center",
	},
	autocompleteTextfield: {
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
		height: 15,
		width: 15,
	},
	datePickerRoot: {
		"&:after": {
			borderBottomColor: theme.palette.secondary.main,
		},
		"&:before": {
			borderBottomColor: theme.palette.secondary.light,
		},
		"&:hover:not($disabled):before": {
			borderBottomColor: theme.palette.primary.light + " !important",
		},
		color: theme.palette.secondary.main,
		"& label.Mui-focused": {
			color: theme.palette.secondary.main,
		},
		"& label": {
			color: theme.palette.secondary.light,
		},
		"& svg": {
			color: theme.palette.secondary.light,
		},
	},
	chip: {
		"&:hover": {
			backgroundColor: theme.palette.secondary.main,
		},
		marginLeft: 5,
		marginBottom: 5,
	},
}))

export const headers = [
	{
		id: PlayerOrderEnum.USERNAME,
		label: "Username",
		sortable: true,
		align: "left",
	},
	{
		id: PlayerOrderEnum.JOIN_DATE,
		label: "Join Date",
		sortable: true,
		align: "left",
	},
	{ id: PlayerOrderEnum.RANK, label: "Rank", sortable: true, align: "left" },
	{
		id: PLAYER_ORDER_ENUM.DAYS_IN_CC,
		label: "Number of Days in CC",
		sortable: true,
		align: "left",
	},
	{
		id: PlayerOrderEnum.CREATED_AT,
		label: "Creation Date",
		sortable: true,
		align: "center",
	},
	{
		id: PlayerOrderEnum.UPDATED_AT,
		label: "Last Updated",
		sortable: true,
		align: "center",
	},
	{
		id: PLAYER_ORDER_ENUM.PREVIOUS_NAMES,
		label: "Previous Names",
		sortable: false,
		align: "center",
	},
	{
		id: PLAYER_ORDER_ENUM.COMMENT,
		label: "Comment",
		sortable: false,
		align: "left",
	},
	{
		id: PLAYER_ORDER_ENUM.ACTIONS,
		label: "Actions",
		sortable: false,
		align: "center",
	},
]
export const headerDistribution = [
	{ percentage: "10%", min: "120px" },
	{ percentage: "10%", min: "150px" },
	{ percentage: "10%", min: "150px" },
	{ percentage: "5%", min: "100px" },
	{ percentage: "10%", min: "100px" },
	{ percentage: "10%", min: "100px" },
	{ percentage: "20%", min: "150px" },
	{ percentage: "15%", min: "200px" },
	{ percentage: "10%", min: "100px" },
]

export interface ISortableTableHead {
	order: OrderEnum
	orderBy: PlayerOrderEnum | PLAYER_ORDER_ENUM
	handleSort: (id: PlayerOrderEnum | PLAYER_ORDER_ENUM) => void
}

function SortableTableHead({ orderBy, order, handleSort }: ISortableTableHead) {
	const classes = useStyles()

	return (
		<TableHead className={classes.thead}>
			<TableRow>
				{headers.map((header, index) =>
					header.sortable ? (
						<TableCell
							key={header.id}
							width={headerDistribution[index].percentage}
							align={header.align as TableCellProps["align"]}
							style={{ minWidth: headerDistribution[index].min }}>
							<TableSortLabel
								active={orderBy === header.id}
								direction={
									(orderBy === header.id
										? order.toLowerCase()
										: OrderEnum.ASC.toLowerCase()) as TableSortLabelTypeMap["props"]["direction"]
								}
								onClick={(e) => {
									handleSort(header.id as PlayerOrderEnum)
								}}
								className={classes.sortLabel}
								classes={{
									active: classes.sortLabelActive,
									icon: classes.sortLabelActive,
								}}>
								{header.label}
							</TableSortLabel>
						</TableCell>
					) : (
						<TableCell
							key={header.id}
							width={headerDistribution[index].percentage}
							align={header.align as TableCellProps["align"]}
							style={{ minWidth: headerDistribution[index].min }}>
							{header.label}
						</TableCell>
					)
				)}
			</TableRow>
		</TableHead>
	)
}

export default SortableTableHead
