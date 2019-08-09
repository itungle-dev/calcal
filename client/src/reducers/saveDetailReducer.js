import { SAVE_DETAILS } from "../actions/types";

export default function(state = {}, action) {
	switch (action.type) {
		case SAVE_DETAILS:
			return action.payload || false;
		default:
			return state;
	}
}
