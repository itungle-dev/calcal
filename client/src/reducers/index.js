import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import userInfoReducer from "./userInfoReducer";

export default combineReducers({
	auth: authReducer,
	form: reduxForm,
	userInfo: userInfoReducer
});
