import React from "react";
import ResultCaloriesBox from "./ResultCaloriesBox";
import ResultChart from "./ResultChart";
import { Grid, Card, CardContent, Box, Typography } from "@material-ui/core";

const ResultRow = ({ label, weeklyCalories, dailyCalories, data, hasGoal }) => {
	return (
		<Box p={2}>
			<Card>
				<CardContent>
					<Typography variant="h6">{label}</Typography>
				</CardContent>
				<Grid
					container
					direction="row"
					justify="flex-start"
					alignItems="flex-start"
				>
					<Grid item>
						<ResultCaloriesBox
							label={label}
							macrosData={data}
							weeklyCalories={weeklyCalories}
							dailyCalories={dailyCalories}
							hasGoal={hasGoal}
						/>
					</Grid>
					<Grid item>
						<ResultChart data={data} />
					</Grid>
				</Grid>
			</Card>
		</Box>
	);
};

export default ResultRow;
