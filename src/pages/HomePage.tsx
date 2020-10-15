import React, { useEffect } from "react"
import Header from "../components/Header"
import HomeTabPanels from "../components/HomeTabPanels"
import { useHistory } from "react-router-dom"
import { HOME_ROUTE, PLAYERS_ROUTE } from "../assets/constants/routes"

function HomePage() {
	const history = useHistory();

	useEffect(() => {
		if(history.location.pathname === HOME_ROUTE) {
			history.push(PLAYERS_ROUTE)
		}
	}, [history])

	return (
		<>
			<Header />
			<HomeTabPanels />
		</>
	)
}

export default HomePage
