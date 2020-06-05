import {errorReducer} from "./errorReducer";
import {infoReducer} from "./infoReducer";

const rootReducer = ({errors, info}, action) => {
    //Middleware goes here, but I got none.

    return {
        errors: errorReducer(errors, action),
        info: infoReducer(info, action)
    }
};

export default rootReducer;
