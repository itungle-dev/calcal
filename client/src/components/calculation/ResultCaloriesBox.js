import React from "react";
import { Paper, Typography } from "@material-ui/core";

const ResultCaloriesBox = ({
	label,
	dailyCalories,
	weeklyCalories,
	macrosData
}) => {
	return (
		<div>
			<Typography>{dailyCalories} Calories per day</Typography>
			<Typography>{weeklyCalories} Calories per week</Typography>
		</div>
	);
};

export default ResultCaloriesBox;
