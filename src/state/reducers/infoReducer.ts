import {REMOVE_INFO, SET_INFO} from "../actions";
import initialState, {IInfo} from "../initialState";
import {IAction} from "../state";

export const infoReducer = (state: IInfo | undefined, action: IAction) => {
    switch (action.type) {
        case SET_INFO:
            return action.info;
        case REMOVE_INFO:
            return initialState.info;
        default:
            return state;
    }
};
