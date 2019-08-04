import React from "react";
import { renderSelect } from "../renderInputs";
import { Field } from "redux-form";
import { MenuItem } from "@material-ui/core";

const ActivityLevel = () => {
	const activities = [
		{ label: "Little or no exercise", value: 1.2 },
		{ label: "Exercise 1-3 times/week", value: 1.375 },
		{ label: "Exercise 3-5 times/week", value: 1.55 },
		{ label: "Exercise 6-7 times/week", value: 1.725 },
		{ label: "Exercise 9+ times/week", value: 2.0 }
	];

	const activityOptions = activities.map((activity, index) => {
		return (
			<MenuItem key={activity.value} value={activity.value}>
				{activity.label}
			</MenuItem>
		);
	});

	return (
		<Field
			name="activity"
			component={renderSelect}
			menuItems={activityOptions}
			variant="outlined"
		/>
	);
};

export default ActivityLevel;
