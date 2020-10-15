import React, { forwardRef, useEffect, useState } from "react"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import { SlideProps, useMediaQuery } from "@material-ui/core"
import Toolbar from "@material-ui/core/Toolbar"
import SearchField from "./SearchField"
import IconButton from "@material-ui/core/IconButton"
import clsx from "clsx"
import CloseIcon from "@material-ui/icons/Close"
import FilterListIcon from "@material-ui/icons/FilterList"
import Collapse from "@material-ui/core/Collapse"
import Paper from "@material-ui/core/Paper"
import { StyledButton } from "../assets/theme/styledComponents"
import Dialog from "@material-ui/core/Dialog"
import Typography from "@material-ui/core/Typography"
import Slide from "@material-ui/core/Slide"

const useStyles = makeStyles(theme => ({
	toolbar: {
		backgroundColor: theme.palette.primary.dark,
		justifyContent: "flex-end",
		padding: 0
	},
	filterButton: {
		color: theme.palette.primary.dark,
		backgroundColor: theme.palette.secondary.main,
		marginLeft: 40,
		borderRadius: 0,
		minHeight: 56,
		width: 80,
		height: "100%",
		"&:hover": {
			color: theme.palette.secondary.light,
			backgroundColor: theme.palette.primary.dark,
			border: "2px solid " + theme.palette.secondary.main
		}
	},
	filterButtonActive: {
		color: theme.palette.secondary.light,
		backgroundColor: theme.palette.primary.dark,
		border: "2px solid " + theme.palette.secondary.main,
		borderBottom: "none",
		"&:hover": {
			borderBottom: "none"
		}
	},
	closeButton: {
		color: theme.palette.secondary.main
	},
	paperFilter: {
		backgroundColor: theme.palette.primary.dark,
		width: "calc(100% - 4px)",
		minHeight: 100,
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-start",
		"& > *": {
			marginTop: 0
		},
		border: "2px solid " + theme.palette.secondary.main,
		[theme.breakpoints.down("md")]: {
			justifyContent: "center",
			flexDirection: "column",
			"& > *": {
				marginTop: 30
			}
		}
	},
	collapseContainer: {
		flexShrink: 0
	},
	actionsContainer: {
		marginLeft: "auto",
		marginRight: 20,
		alignSelf: "flex-end",
		marginBottom: 20,
		"& > button": {
			marginLeft: 20
		},
		[theme.breakpoints.down("md")]: {
			alignSelf: "center",
			marginLeft: 0,
			marginRight: 0
		}
	},
	dialogContainer: {
		"& .MuiDialog-paper": {
			overflowX: "hidden",
			backgroundColor: theme.palette.primary.main,
			textAlign: "center",
			"&:first-child": {
				color: theme.palette.secondary.light
			}
		}
	},
	rankFilter: {
		marginLeft: 40
	},
	daysFilter: {
		marginLeft: 40
	}
}))

export interface ICompetitionTableToolbarProps {
	handleApplyFilters: (search?: string) => void
}

const Transition = forwardRef<unknown, SlideProps>((props, ref) => {
	return <Slide direction="up" ref={ref} {...props} />
})

Transition.displayName = "SlideTransition"

let search: string | undefined = undefined

function CompetitionTableToolbar({ handleApplyFilters }: ICompetitionTableToolbarProps) {
	const theme = useTheme()
	const matches = useMediaQuery(theme.breakpoints.down("md"))
	const classes = useStyles()
	const [openFilter, setOpenFilter] = useState(false)
	const [resetFilter, setResetFilter] = useState(false)
	const [disableActions, setDisableActions] = useState(true)

	const handleOpenFilter = () => {
		setOpenFilter(!openFilter)
	}

	const handleApply = () => {
		if (matches) {
			setOpenFilter(false)
		}
		handleApplyFilters(search)
	}

	const handleSearch = (newValue: string) => {
		search = newValue
		handleApply()
	}

	const handleResetFilter = () => {
		setResetFilter(true)
	}

	useEffect(() => {
		if (resetFilter) {
			handleApplyFilters(undefined)
			setResetFilter(false)
		}
	}, [handleApplyFilters, resetFilter])

	return (
		<>
			<Toolbar className={classes.toolbar}>
				<SearchField handler={handleSearch} />
				<IconButton
					className={
						openFilter
							? clsx(
							classes.filterButton,
							classes.filterButtonActive
							)
							: classes.filterButton
					}
					onClick={handleOpenFilter}>
					{openFilter ? <CloseIcon /> : <FilterListIcon />}
				</IconButton>
			</Toolbar>
			{!matches ? (
				<Collapse
					in={Boolean(openFilter)}
					addEndListener={() => {
					}}
					className={classes.collapseContainer}>
					<Paper className={classes.paperFilter} square>

						<div className={classes.actionsContainer}>
							<StyledButton
								variant={"contained"}
								onClick={handleApply}
								disabled={disableActions}>
								Apply
							</StyledButton>
							<StyledButton
								variant={"contained"}
								onClick={handleResetFilter}
								disabled={disableActions}>
								Reset filter
							</StyledButton>
						</div>
					</Paper>
				</Collapse>
			) : (
				<Dialog
					fullScreen={true}
					open={matches && Boolean(openFilter)}
					TransitionComponent={Transition}
					className={classes.dialogContainer}>
					<Typography variant={"h5"}>Filters</Typography>
					<Paper className={classes.paperFilter} square>

						<div className={classes.actionsContainer}>
							<StyledButton
								variant={"contained"}
								onClick={handleApply}
								disabled={disableActions}>
								Apply
							</StyledButton>
							<StyledButton
								variant={"contained"}
								onClick={handleResetFilter}
								disabled={disableActions}>
								Reset filter
							</StyledButton>
							<StyledButton
								variant={"contained"}
								onClick={handleOpenFilter}>
								Close
							</StyledButton>
						</div>
					</Paper>
				</Dialog>
			)}
		</>
	)
}

export default CompetitionTableToolbar
