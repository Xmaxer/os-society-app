import { useCallback, useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import {
	APIError,
	ClientContext,
	useManualQuery,
	useMutation,
} from "graphql-hooks"
import { useGlobalState } from "../state/state"
import { ADD_ERRORS } from "../state/actions"
import { API_OFFLINE_ERROR, LOGIN_ROUTE } from "../assets/constants/routes"
import { MUTATION_OPERATION } from "../assets/constants/operations"
import { IRequest } from "../assets/api/queries"
import { print } from "graphql"

export interface IGraphQLError {
	message: string
	extensions?: {
		code?: number
	}
}

export interface IUseApiProps {
	query: IRequest
}

export interface IRequestHandler<DataType, VariablesType> {
	variables?: VariablesType
	handleComplete?: () => void
	handleSuccess?: (data: DataType) => void
	handleError?: (error: APIError<IGraphQLError>) => void
}

function useApi<DataType, VariablesType = Record<string, unknown>>({
	query,
}: IUseApiProps) {
	const { dispatch } = useGlobalState()
	const history = useHistory()

	// Include the access token if one exists
	const client = useContext(ClientContext)
	const access_token = localStorage.getItem("access_token")
	if (access_token) {
		client.setHeader("Authorization", "Bearer " + access_token)
	}

	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<undefined | APIError<IGraphQLError>>(
		undefined
	)
	const [data, setData] = useState<DataType | undefined>(undefined)
	const [mutationCall] = useMutation<DataType, VariablesType, IGraphQLError>(
		print(query.query)
	)
	const [queryCall] = useManualQuery<DataType, VariablesType, IGraphQLError>(
		print(query.query)
	)
	const call = query.type === MUTATION_OPERATION ? mutationCall : queryCall

	// This is potentially one of the dumbest things I've seen in my life
	// Why does 'useCallback' destroy all types...
	// @ts-ignore
	const request = useCallback(
		({
			variables = {} as VariablesType,
			handleComplete,
			handleSuccess,
			handleError,
		}: IRequestHandler<DataType, VariablesType>) => {
			setLoading(true)
			call(variables ? { variables: { ...variables } } : {}).then(
				(response) => {
					if (!response.error) {
						setData(response.data)
						if (handleSuccess) handleSuccess(response.data)
					} else {
						if (
							response.error &&
							response.error.fetchError &&
							response.error.fetchError.message ===
								"Failed to fetch"
						) {
							history.push(API_OFFLINE_ERROR)
							return
						} else if (
							response.error.graphQLErrors &&
							response.error.graphQLErrors.find(
								(e: any) =>
									e.extensions && e.extensions.code === -1
							)
						) {
							history.push(LOGIN_ROUTE)
							return
						} else {
							dispatch({
								type: ADD_ERRORS,
								errors: response.error,
							})
							setError(response.error)
							if (handleError) handleError(response.error)
						}
					}
					setLoading(false)
					if (handleComplete) handleComplete()
				}
			)
		},
		[call, dispatch, history]
	)

	return { request, loading, error, data }
}

export default useApi
