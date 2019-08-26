import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Typography, Paper, Box } from "@material-ui/core";
import * as actions from "../../../actions";
import * as calcMethods from "../../../utils/calculationMethods";
import {
	MACROS_RATIOS,
	GOAL_LABELS,
	GOAL_PACE
} from "../../../data/selectFieldData";

import ResultRow from "./ResultRow";

class Result extends Component {
	handleSave = newUserInfo => {
		return this.props.saveUserInfo(newUserInfo);
	};

	render() {
		const {
			age,
			gender,
			weight,
			heightFt,
			heightIn,
			heightCm,
			activity,
			macros,
			goal,
			goalPace
		} = this.props.formValues;
		const { tabUnit } = this.props;

		const { proteinsRatio, carbsRatio, fatsRatio } = MACROS_RATIOS[macros];

		const updatedHeightImperial =
			tabUnit === 0
				? calcMethods.updateFeetAndInches(heightFt, heightIn)
				: calcMethods.convertHeightMetricToImperial(heightCm);

		const updatedHeightFt = updatedHeightImperial.feet;
		const updatedHeightIn = updatedHeightImperial.inches;
		const heightInCm =
			tabUnit === 0
				? calcMethods.convertHeightToCm(updatedHeightFt, updatedHeightIn)
				: Math.round(Number(heightCm));

		const weightInKilo =
			tabUnit === 0
				? calcMethods.convertWeightToKilo(weight)
				: Math.round(Number(weight));
		const weightInPound =
			tabUnit === 0
				? Math.round(Number(weight))
				: calcMethods.convertWeightToPound(weight);

		const {
			maintenanceDailyCalories,
			maintenanceWeeklyCalories,
			cuttingDailyCalories,
			cuttingWeeklyCalories,
			bulkingDailyCalories,
			bulkingWeeklyCalories
		} = calcMethods.mifflinEquation(
			gender,
			age,
			weightInKilo,
			heightInCm,
			activity,
			GOAL_PACE[goalPace].dailyCalories
		);

		const goalDailyCalories =
			goal === 0
				? maintenanceDailyCalories
				: goal === 1
				? cuttingDailyCalories
				: bulkingDailyCalories;
		const goalWeeklyCalories =
			goal === 0
				? maintenanceWeeklyCalories
				: goal === 1
				? cuttingWeeklyCalories
				: bulkingWeeklyCalories;
		const maintenanceMacroInCalories = calcMethods.macronutrientInCalories(
			Number(maintenanceDailyCalories),
			[proteinsRatio, carbsRatio, fatsRatio]
		);
		const maintenanceMacroInGrams = calcMethods.macronutrientInGrams(
			Number(maintenanceDailyCalories),
			[proteinsRatio, carbsRatio, fatsRatio]
		);

		const goalMacroInGrams = calcMethods.macronutrientInGrams(
			Number(goalDailyCalories),
			[proteinsRatio, carbsRatio, fatsRatio]
		);
		const goalMacroInCalories = calcMethods.macronutrientInCalories(
			Number(goalDailyCalories),
			[proteinsRatio, carbsRatio, fatsRatio]
		);

		const macrosInfo = {
			proteins: {
				ratio: proteinsRatio,
				maintenanceCalories: maintenanceMacroInCalories.proteinsCalories,
				maintenanceGrams: maintenanceMacroInGrams.proteinsGrams,
				goalCalories: goalMacroInCalories.proteinsCalories,
				goalGrams: goalMacroInGrams.proteinsGrams
			},
			carbs: {
				ratio: carbsRatio,
				maintenanceCalories: maintenanceMacroInCalories.carbsCalories,
				maintenanceGrams: maintenanceMacroInGrams.carbsGrams,
				goalCalories: goalMacroInCalories.carbsCalories,
				goalGrams: goalMacroInGrams.carbsGrams
			},
			fats: {
				ratio: fatsRatio,
				maintenanceCalories: maintenanceMacroInCalories.fatsCalories,
				maintenanceGrams: maintenanceMacroInGrams.fatsGrams,
				goalCalories: goalMacroInCalories.fatsCalories,
				goalGrams: goalMacroInGrams.fatsGrams
			}
		};

		const goalLabel = GOAL_LABELS[goal].label;

		const proteinsData = {
			ratio: proteinsRatio,
			color: "orange",
			name: "Proteins"
		};
		const carbsData = {
			ratio: carbsRatio,
			color: "red",
			name: "Carbs"
		};

		const fatsData = {
			ratio: fatsRatio,
			color: "green",
			name: "Fats"
		};

		let maintenanceMacrosData = [
			{
				calories: macrosInfo.proteins.maintenanceCalories,
				grams: macrosInfo.proteins.maintenanceGrams,
				...proteinsData
			},
			{
				calories: macrosInfo.carbs.maintenanceCalories,
				grams: macrosInfo.carbs.maintenanceGrams,
				...carbsData
			},
			{
				calories: macrosInfo.fats.maintenanceCalories,
				grams: macrosInfo.fats.maintenanceGrams,
				...fatsData
			}
		];

		let goalMacrosData = [
			{
				calories: macrosInfo.proteins.goalCalories,
				grams: macrosInfo.proteins.goalGrams,
				...proteinsData
			},
			{
				calories: macrosInfo.carbs.goalCalories,
				grams: macrosInfo.carbs.goalGrams,
				...carbsData
			},
			{
				calories: macrosInfo.fats.goalCalories,
				grams: macrosInfo.fats.goalGrams,
				...fatsData
			}
		];

		const newUserInfo = {
			unitPreference: tabUnit,
			age: Number(age),
			gender: gender,
			weight: {
				pound: weightInPound,
				kilo: weightInKilo
			},
			height: {
				feet: updatedHeightFt,
				inches: updatedHeightIn,
				cm: heightInCm
			},
			goal,
			goalPace,
			macros,
			activity
		};

		const heightInput =
			tabUnit === 1
				? `${heightInCm} cm`
				: heightFt
				? Number(heightIn) !== 0
					? `${heightFt} ft and ${heightIn} in`
					: `${heightFt} ft`
				: `${heightIn} in`;
		const weightInput = tabUnit === 0 ? `${weight} lbs` : `${weightInKilo} kgs`;
		console.log("this.props.auth", this.props.auth);
		return (
			<Paper square>
				<Box p={2}>
					<Typography variant="h5">Result</Typography>
				</Box>
				<Box p={2}>
					<Typography>
						As a {age} years old {gender} weighted {weightInput} and{" "}
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
						goal={goal}
						goalPace={goalPace}
					/>
				)}

				<Box align="center" p={2}>
					<Button
						label="button"
						variant="outlined"
						color="primary"
						disabled={!this.props.auth}
						onClick={() => {
							this.handleSave(newUserInfo);
						}}
					>
						{!this.props.auth ? "Login to Save" : "Save"}
					</Button>
				</Box>
			</Paper>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		formValues: state.form.calForm.values,
		auth: state.auth
	};
}

export default connect(
	mapStateToProps,
	actions
)(Result);
