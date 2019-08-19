import React, { Fragment } from "react";
import { CardContent, Typography, makeStyles } from "@material-ui/core";
const ResultCaloriesBox = ({
	label,
	dailyCalories,
	weeklyCalories,
	goal,
	goalPace
}) => {
	const useStyles = makeStyles({
		title: {
			fontSize: 14
		}
	});

	const classes = useStyles();

	return (
		<Fragment>
			<CardContent>
				<Typography
					className={classes.title}
					color="textSecondary"
					gutterBottom
				>
					Daily Caloric Intake
				</Typography>
				<Typography>{dailyCalories} Calories </Typography>
			</CardContent>
			<CardContent>
				<Typography
					className={classes.title}
					color="textSecondary"
					gutterBottom
				>
					Weekly Caloric Intake
				</Typography>
				<Typography>{weeklyCalories} Calories</Typography>
			</CardContent>
		</Fragment>
	);
};

export default ResultCaloriesBox;
