import { ADD_ERRORS, REMOVE_ERRORS } from "../actions"
import initialState from "../initialState"
import { IAction } from "../state"
import { APIError } from "graphql-hooks"
import { IGraphQLError } from "../../hooks/useApi"

export const errorReducer = (
	state: APIError<IGraphQLError> | undefined,
	action: IAction
) => {
	switch (action.type) {
		case ADD_ERRORS:
			return action.errors
		case REMOVE_ERRORS:
			return initialState.errors
		default:
			return state
	}
}
