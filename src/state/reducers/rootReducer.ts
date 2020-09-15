import {errorReducer} from "./errorReducer"
import {infoReducer} from "./infoReducer"
import {IGlobalState} from "../initialState"
import {IAction} from "../state"

const rootReducer = ({errors, info}: IGlobalState, action: IAction) => {
	//Middleware goes here, but I got none.

	return {
		errors: errorReducer(errors, action),
		info: infoReducer(info, action),
	}
}

export default rootReducer
