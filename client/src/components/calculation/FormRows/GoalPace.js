import React from "react";
import { renderSelect } from "../renderInputs";
import { Field } from "redux-form";
import { MenuItem } from "@material-ui/core";
import { GOAL_PACE } from "../data/selectFieldData";

const GoalPace = ({ unit, goal }) => {
	const rateOptions = GOAL_PACE.map(
		(
			{ label, value, dailyCalories, weeklyCalories, imperial, metric },
			index
		) => {
			return (
				<MenuItem key={value} value={value}>
					{label} ( {goal === 1 ? "-" : "+"}
					{dailyCalories} calories/
					{unit === 0
						? `${imperial} ${imperial === 1 ? "lb" : "lbs"}`
						: `${metric} ${metric === 1 ? "kg" : "kgs"}`}
					)
				</MenuItem>
			);
		}
	);
	return (
		<Field
			name="goalPace"
			component={renderSelect}
			menuItems={rateOptions}
			variant="outlined"
			unit={unit}
		/>
	);
};

export default GoalPace;
