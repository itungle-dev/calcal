import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Grid } from "@material-ui/core";
import UnitTabs from "./UnitTabs";
import DetailForm from "./DetailForm";
import Result from "./Result";
import * as calcMethods from "../../utils/calculationMethods";
import { MACROS_RATIOS } from "./data/selectFieldData";

class Calculation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tabUnit: 0,
			showResult: false,
			age: 0,
			gender: "",
			weight: 0,
			heightFt: 0,
			heightIn: 0,
			weightInKilo: 0,
			heightInCm: 0,
			maintenanceDailyCalories: 0,
			maintenanceWeeklyCalories: 0,
			cuttingDailyCalories: 0,
			cuttingWeeklyCalories: 0,
			bulkingDailyCalories: 0,
			bulkingWeeklyCalories: 0,
			activity: 1.2,
			goal: 1,
			goalPace: 0,
			macronutrient: {
				proteins: {
					ratio: 35,
					maintenanceCalories: 0,
					maintenanceGrams: 0,
					goalCalories: 0,
					goalGrams: 0
				},
				carbs: {
					ratio: 40,
					maintenanceCalories: 0,
					maintenanceGrams: 0,
					goalCalories: 0,
					goalGrams: 0
				},
				fats: {
					ratio: 25,
					maintenanceCalories: 0,
					maintenanceGrams: 0,
					goalCalories: 0,
					goalGrams: 0
				}
			}
		};
	}

	handleCalculation = (values, thunk, props) => {
		const {
			age,
			gender,
			weight,
			heightFt,
			heightIn,
			heightCm,
			activity,
			goal,
			goalPace,
			macros
		} = values;

		console.log("index.js values", values);

		const { proteinsRatio, carbsRatio, fatsRatio } = MACROS_RATIOS[macros];

		const [updatedHeightFt, updatedHeightIn] = calcMethods.updateFeetAndInches(
			heightFt,
			heightIn
		);

		const weightInKilo =
			this.state.tabUnit === 0
				? calcMethods.convertWeightToKilo(weight)
				: Math.round(Number(weight));

		const heightInCm =
			this.state.tabUnit === 0
				? calcMethods.convertHeightToCm(updatedHeightFt, updatedHeightIn)
				: Math.round(Number(heightCm));

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
			activity
		);
		const goalDailyCalories =
			goal === 0
				? maintenanceDailyCalories
				: goal === 1
				? cuttingDailyCalories
				: bulkingDailyCalories;

		const [
			maintenanceProteinsGrams,
			maintenanceCarbsGrams,
			maintenanceFatsGrams
		] = calcMethods.macronutrientInGrams(Number(maintenanceDailyCalories), [
			proteinsRatio,
			carbsRatio,
			fatsRatio
		]);
		const [
			maintenanceProteinsCalories,
			maintenanceCarbsCalories,
			maintenanceFatsCalories
		] = calcMethods.macronutrientInCalories(Number(maintenanceDailyCalories), [
			proteinsRatio,
			carbsRatio,
			fatsRatio
		]);
		const [
			goalProteinsGrams,
			goalCarbsGrams,
			goalFatsGrams
		] = calcMethods.macronutrientInGrams(Number(goalDailyCalories), [
			proteinsRatio,
			carbsRatio,
			fatsRatio
		]);
		const [
			goalProteinsCalories,
			goalCarbsCalories,
			goalFatsCalories
		] = calcMethods.macronutrientInCalories(Number(goalDailyCalories), [
			proteinsRatio,
			carbsRatio,
			fatsRatio
		]);

		this.setState((prevState, props) => {
			return {
				showResult: !prevState.showResult,
				age: age,
				gender: gender,
				weight: weight,
				heightFt: updatedHeightFt,
				heightIn: updatedHeightIn,
				weightInKilo: weightInKilo,
				heightInCm: heightInCm,
				maintenanceDailyCalories: maintenanceDailyCalories,
				maintenanceWeeklyCalories: maintenanceWeeklyCalories,
				cuttingDailyCalories: cuttingDailyCalories,
				cuttingWeeklyCalories: cuttingWeeklyCalories,
				bulkingDailyCalories: bulkingDailyCalories,
				bulkingWeeklyCalories: bulkingWeeklyCalories,
				goal: goal,
				goalPace: goalPace,
				activity: activity,
				macronutrient: {
					proteins: {
						ratio: proteinsRatio,
						maintenanceCalories: maintenanceProteinsCalories,
						maintenanceGrams: maintenanceProteinsGrams,
						goalCalories: goalProteinsCalories,
						goalGrams: goalProteinsGrams
					},
					carbs: {
						ratio: carbsRatio,
						maintenanceCalories: maintenanceCarbsCalories,
						maintenanceGrams: maintenanceCarbsGrams,
						goalCalories: goalCarbsCalories,
						goalGrams: goalCarbsGrams
					},
					fats: {
						ratio: fatsRatio,
						maintenanceCalories: maintenanceFatsCalories,
						maintenanceGrams: maintenanceFatsGrams,
						goalCalories: goalFatsCalories,
						goalGrams: goalFatsGrams
					}
				}
			};
		});
	};

	handleTabChange = (event, value) => {
		this.setState({
			tabUnit: value
		});
	};

	displayUserResult = () => {
		return (
			<Grid item sm={8} style={{ height: "100%" }}>
				<Result
					{...this.state}
					onSave={values => console.log("in side onSave", values)}
				/>
			</Grid>
		);
	};

	render() {
		return (
			<Grid container spacing={3} justify="flex-start" alignItems="stretch">
				<Grid item sm={4}>
					<UnitTabs
						tabUnit={this.state.tabUnit}
						handleTabChange={this.handleTabChange}
					/>
					<DetailForm
						onSubmit={this.handleCalculation}
						tabUnit={this.state.tabUnit}
					/>
				</Grid>
				{this.displayUserResult()}
			</Grid>
		);
		// this.state.showResult &&
	}
}
function mapStateToProps(state, ownProps) {
	return {};
}
Calculation = connect(mapStateToProps)(Calculation);

export default reduxForm({
	form: "calForm"
})(Calculation);
