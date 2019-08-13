import React from "react";
import { renderSelect } from "../renderInputs";
import { Field } from "redux-form";
import { MenuItem } from "@material-ui/core";
import { GOAL_LABELS } from "../data/selectFieldData";
const Goal = ({ handleGoalChange }) => {
	const goalOptions = GOAL_LABELS.map(({ label, value }, index) => {
		return (
			<MenuItem key={value} value={value}>
				{label}
			</MenuItem>
		);
	});

	return (
		<Field
			name="goal"
			component={renderSelect}
			menuItems={goalOptions}
			onChange={handleGoalChange}
			variant="outlined"
		/>
	);
};

export default Goal;
