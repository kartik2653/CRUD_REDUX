import { createStore,applyMiddleware } from "redux";
import { userReducer } from "./user/UserReducer";
import thunk from "redux-thunk";
import {reducer} from './rootReducer';
const store = createStore(reducer,applyMiddleware(thunk));
export default store;