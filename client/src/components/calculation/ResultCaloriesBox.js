import React from "react";
import { Box, Paper, Typography } from "@material-ui/core";

const ResultCaloriesBox = ({ label, dailyCalories, weeklyCalories }) => {
	return (
		<Box p={2} bgcolor="red">
			<Paper square>
				<Typography variant="h6">{label}</Typography>
			</Paper>
			<Paper square>
				<Typography>{dailyCalories} Calories per day</Typography>
				<Typography>{weeklyCalories} Calories per week</Typography>
			</Paper>
		</Box>
	);
};

export default ResultCaloriesBox;
