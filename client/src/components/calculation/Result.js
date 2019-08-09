import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Button, Typography, Paper, Box } from "@material-ui/core";
import * as actions from "../../actions";

import ResultRow from "./ResultRow";

class Result extends Component {
	render() {
		const {
			tabUnit,
			age,
			gender,
			weight,
			heightBig,
			heightSmall,
			maintenanceDailyCalories,
			maintenanceWeeklyCalories,
			cuttingDailyCalories,
			cuttingWeeklyCalories,
			bulkingDailyCalories,
			bulkingWeeklyCalories,
			macronutrient,
			goal
		} = this.props;
		const goalLabel = goal === 1 ? "Cutting" : "Bulking";
		const goalDailyCalories =
			goal === 1 ? cuttingDailyCalories : bulkingDailyCalories;
		const goalWeeklyCalories =
			goal === 1 ? cuttingWeeklyCalories : bulkingWeeklyCalories;

		const proteinsData = {
			ratio: macronutrient.proteins.ratio,
			color: "orange",
			name: "Proteins"
		};
		const carbsData = {
			ratio: macronutrient.carbs.ratio,
			color: "red",
			name: "Carbs"
		};

		const fatsData = {
			ratio: macronutrient.fats.ratio,
			color: "green",
			name: "Fats"
		};

		let maintenanceMacrosData = [
			{
				calories: macronutrient.proteins.maintenanceCalories,
				grams: macronutrient.proteins.maintenanceGrams,
				...proteinsData
			},
			{
				calories: macronutrient.carbs.maintenanceCalories,
				grams: macronutrient.carbs.maintenanceGrams,
				...carbsData
			},
			{
				calories: macronutrient.fats.maintenanceCalories,
				grams: macronutrient.fats.maintenanceGrams,
				...fatsData
			}
		];

		let goalMacrosData = [
			{
				calories: macronutrient.proteins.goalCalories,
				grams: macronutrient.proteins.goalGrams,
				...proteinsData
			},
			{
				calories: macronutrient.carbs.goalCalories,
				grams: macronutrient.carbs.goalGrams,
				...carbsData
			},
			{
				calories: macronutrient.fats.goalCalories,
				grams: macronutrient.fats.goalGrams,
				...fatsData
			}
		];

		const heightBigUnit = tabUnit === 0 ? "ft" : "m";
		const heightSmallUnit = tabUnit === 0 ? "in" : "cm";

		const heightInput =
			heightBig && Number(heightSmall) !== 0
				? `${heightBig} ${heightBigUnit} and ${heightSmall} ${heightSmallUnit}`
				: heightBig && Number(heightSmall) === 0
				? `${heightBig} ${heightBigUnit}`
				: `${heightSmall} ${heightSmallUnit}`;

		const weightUnit = tabUnit === 0 ? `lbs` : `kgs`;

		return (
			<Paper square>
				<Box p={2}>
					<Typography variant="h5">Result</Typography>
				</Box>
				<Box p={2}>
					<Typography>
						As a {age} years old {gender} weighted {weight} {weightUnit} and{" "}
						{heightInput} tall
					</Typography>
				</Box>
				<ResultRow
					data={maintenanceMacrosData}
					label="Maintenance"
					weeklyCalories={maintenanceWeeklyCalories}
					dailyCalories={maintenanceDailyCalories}
				/>

				{goal !== 0 && (
					<ResultRow
						data={goalMacrosData}
						label={goalLabel}
						weeklyCalories={goalWeeklyCalories}
						dailyCalories={goalDailyCalories}
						hasGoal={goal}
						goalCalories={250}
					/>
				)}

				<Box align="center" p={2}>
					<Button
						label="button"
						variant="outlined"
						color="primary"
						onClick={() => {
							const userDetails = {
								tabUnit,
								age,
								gender,
								weight,
								heightBig,
								heightSmall,
								maintenanceDailyCalories,
								maintenanceWeeklyCalories,
								cuttingDailyCalories,
								cuttingWeeklyCalories,
								bulkingDailyCalories,
								bulkingWeeklyCalories,
								macronutrient,
								goal
							};
							return this.props.saveDetails(userDetails);
						}}
					>
						Save
					</Button>
				</Box>
			</Paper>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {};
}

export default connect(
	mapStateToProps,
	actions
)(Result);
