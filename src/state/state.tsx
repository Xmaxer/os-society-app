import * as React from "react"
import {createContext, useContext, useReducer} from "react"
import {IGlobalState, IInfo} from "./initialState"
import {APIError} from "graphql-hooks"
import {IGraphQLError} from "../hooks/useApi"

export interface IAction {
	type: string
	errors?: APIError<IGraphQLError>
	info?: IInfo
}

export interface IReducer {
	(state: IGlobalState, action: IAction): IGlobalState
}

export interface IStateProviderProps {
	reducer: IReducer
	initialState: IGlobalState
	children: React.ReactNode
}

export const StateContext: React.Context<any> = createContext({})

export const StateProvider = ({
	reducer,
	initialState,
	children,
}: IStateProviderProps) => (
	<StateContext.Provider value={useReducer(reducer, initialState)}>
		{children}
	</StateContext.Provider>
)

export const useGlobalState = () =>
	useContext<[IGlobalState, React.Dispatch<IAction>]>(StateContext)
