import axios from "axios";
import { FETCH_USER, SAVE_USER_INFO } from "./types";

// const fetchUser = () => {
// 	return async dispatch => {
// 		const res = await axios.get("/api/current_user");
// 		dispatch({ type: FETCH_USER, payload: res });
// 	};
// };
export const fetchUser = () => async dispatch => {
	const res = await axios.get("/api/current_user");

	dispatch({ type: FETCH_USER, payload: res.data });
};

export const saveUserInfo = values => async dispatch => {
	console.log("action creator details", values);
	const res = await axios.put("/api/user/save", values);

	console.log("res in action index", res);

	dispatch({ type: SAVE_USER_INFO, payload: res.data });
};
