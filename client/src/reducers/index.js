import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import detailsReducer from "./saveDetailReducer";

export default combineReducers({
	auth: authReducer,
	form: reduxForm,
	details: detailsReducer
});
