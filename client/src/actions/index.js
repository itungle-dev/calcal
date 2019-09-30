import axios from "axios";
import { FETCH_USER_SUCCESS, FETCH_USER_FAIL } from "./types";

// const fetchUser = () => {
// 	return async dispatch => {
// 		const res = await axios.get("/api/current_user");
// 		dispatch({ type: FETCH_USER, payload: res });
// 	};
// };
export const fetchUser = () => async dispatch => {
	const res = await axios.get("/api/current_user");
	console.log("fetchuser res.data", res.data);
	if (res.data) {
		dispatch({ type: FETCH_USER_SUCCESS, payload: res.data });
	} else {
		dispatch({ type: FETCH_USER_FAIL });
	}
};

export const saveUserInfo = values => async dispatch => {
	const res = await axios.put("/api/user/save", values);
	dispatch({ type: FETCH_USER_SUCCESS, payload: res.data });
};
