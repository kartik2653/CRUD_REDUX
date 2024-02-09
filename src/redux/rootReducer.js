import { combineReducers } from "redux";
import { userReducer,} from "./user/UserReducer";
import { todoReducer } from "./todos/todoReducer";
import { authReducer } from "./auth/authReducer";
import { loaderReducer } from "./loader/loaderReducer";
import { errorReducer } from "./error/errorReducer";
export const reducer = combineReducers({
    user : userReducer,
    todo : todoReducer,
    auth : authReducer,
    loader : loaderReducer,
    error : errorReducer,
});