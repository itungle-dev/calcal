import React from "react";
import { renderSelect } from "../renderInputs";
import { Field } from "redux-form";
import { MenuItem } from "@material-ui/core";

const Goal = () => {
	const goals = [
		{ label: "Maintenance", value: 1 },
		{ label: "Cutting", value: 2 },
		{ label: "Bulking", value: 3 }
	];

	const goalOptions = goals.map(({ label, value }, index) => {
		return (
			<MenuItem key={value} value={value}>
				{label}
			</MenuItem>
		);
	});
	// const goalsSelectField =
	return (
		<Field
			name="goal"
			component={renderSelect}
			menuItems={goalOptions}
			variant="outlined"
		/>
	);
};

export default Goal;
