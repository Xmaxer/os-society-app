import {APIError} from "graphql-hooks";
import {IGraphQLError} from "../hooks/useApi";


export interface IInfo {
    type?: string
    message?: string
}

export interface IGlobalState {
    errors?: APIError<IGraphQLError>
    info?: IInfo
}

const initialState: IGlobalState = {
    errors: {
        fetchError: undefined,
        httpError: undefined,
        graphQLErrors: undefined
    },
    info: {
        type: undefined,
        message: undefined
    }
};
export default initialState;
