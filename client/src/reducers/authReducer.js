import { FETCH_USER_SUCCESS, FETCH_USER_FAIL } from "../actions/types";

const initialState = {
	userInfo: null,
	isLoading: true
};

export default function(state = initialState, action) {
	switch (action.type) {
		case FETCH_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				userInfo: action.payload
			};
		case FETCH_USER_FAIL:
			return {
				...state,
				isLoading: false,
				userInfo: false
			};
		default:
			return state;
	}
}
