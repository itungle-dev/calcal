import React from "react";
import ResultCaloriesBox from "./ResultCaloriesBox";
import ResultChart from "./ResultChart";
import { Grid, Box, Paper, Typography } from "@material-ui/core";

const ResultRow = ({ label, weeklyCalories, dailyCalories, data }) => {
	return (
		<Box p={2}>
			<Paper square elevation={0}>
				<Typography variant="h6">{label}</Typography>
			</Paper>
			<Grid container justify="space-around" spacing={1} direction="column">
				<Grid item>
					<ResultCaloriesBox
						label={label}
						macrosData={data}
						weeklyCalories={weeklyCalories}
						dailyCalories={dailyCalories}
					/>
				</Grid>
				<Grid item>
					<ResultChart data={data} />
				</Grid>
			</Grid>
		</Box>
	);
};

export default ResultRow;
