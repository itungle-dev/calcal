import React from "react";
import { Field } from "redux-form";
import { MenuItem } from "@material-ui/core";
import { GOAL_PACE } from "../../../../data/selectFieldData";
import RenderSelectField from "../../../renderFields/RenderSelectField";

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
			label="Goal Pace"
			component={RenderSelectField}
			menuItems={rateOptions}
			variant="outlined"
			unit={unit}
			margin="dense"
		/>
	);
};

export default GoalPace;
