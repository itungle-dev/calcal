import React from "react";
import ResultCaloriesBox from "./ResultCaloriesBox";
import ResultChart from "./ResultChart";
import { Grid, Card, CardContent, Box, Typography } from "@material-ui/core";
import { GOAL_PACE } from "../../../data/selectFieldData";

const ResultRow = ({
	label,
	weeklyCalories,
	dailyCalories,
	data,
	goal,
	goalPace
}) => {
	const negPos = goal === 1 ? `-` : "+";
	const caloriesIntakeDiff =
		goal &&
		`( ${negPos}${
			GOAL_PACE[goalPace].dailyCalories
		} daily calories | ${negPos}${
			GOAL_PACE[goalPace].weeklyCalories
		} weekly calories)`;

	return (
		<Box p={2}>
			<Card>
				<CardContent>
					<Typography variant="h6">{label}</Typography>
					<Typography variant="subtitle1">{caloriesIntakeDiff}</Typography>
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
