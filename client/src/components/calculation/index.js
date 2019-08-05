import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { Grid } from "@material-ui/core";
import UnitTabs from "./UnitTabs";
import DetailForm from "./DetailForm";
import Result from "./Result";
import * as calcMethods from "../../utils/calculationMethods";
import { macrosRatioFields } from "./data/selectFieldData";

class Calculation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tabUnit: 0,
			showResult: false,
			age: 0,
			gender: "",
			weight: 0,
			heightBig: 0,
			heightSmall: 0,
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
			macros: 0,
			macrosRatio: {
				proteins: { ratio: 40, calories: 0, grams: 0 },
				carbs: { ratio: 30, calories: 0, grams: 0 },
				fats: { ratio: 30, calories: 0, grams: 0 }
			}
		};
	}

	handleCalculation = (values, thunk, props) => {
		const {
			age,
			gender,
			weight,
			heightBig,
			heightSmall,
			activity,
			goal,
			macros
		} = values;

		const oneBigUnitToSmallUnit = this.state.tabUnit === 0 ? 12 : 10;

		const updatedHeightBig =
			Number(heightBig) + Math.floor(heightSmall / oneBigUnitToSmallUnit);
		const updatedHeightSmall = Number(heightSmall) % oneBigUnitToSmallUnit;

		const weightInKilo =
			this.state.tabUnit === 0
				? calcMethods.convertWeightToKilo(weight)
				: parseInt(weight);

		const heightInCm =
			this.state.tabUnit === 0
				? calcMethods.convertHeightToCm(heightBig, heightSmall)
				: Number(heightBig) * 10 + Number(heightSmall);

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

		const {
			proteinsGrams,
			carbsGrams,
			fatsGrams
		} = calcMethods.macronutrientInGrams(cuttingDailyCalories, [
			macros.proteins,
			macros.carbs,
			macros.fats
		]);
		const {
			proteinsCalories,
			carbsCalories,
			fatsCalories
		} = calcMethods.macronutrientInCalories(cuttingDailyCalories, [
			macros.proteins,
			macros.carbs,
			macros.fats
		]);

		const prevShowResult = this.state.showResult;

		this.setState({
			showResult: !prevShowResult,
			age: age,
			gender: gender,
			weight: weight,
			heightBig: updatedHeightBig,
			heightSmall: updatedHeightSmall,
			weightInKilo: weightInKilo,
			heightInCm: heightInCm,
			maintenanceDailyCalories: maintenanceDailyCalories,
			maintenanceWeeklyCalories: maintenanceWeeklyCalories,
			cuttingDailyCalories: cuttingDailyCalories,
			cuttingWeeklyCalories: cuttingWeeklyCalories,
			bulkingDailyCalories: bulkingDailyCalories,
			bulkingWeeklyCalories: bulkingWeeklyCalories,
			goal: goal,
			activity: activity,
			macrosRatio: {
				proteins: {
					ratio: macrosRatioFields[macros].proteins,
					calories: proteinsCalories,
					grams: proteinsGrams
				},
				carbs: {
					ratio: macrosRatioFields[macros].carbs,
					calories: carbsCalories,
					grams: carbsGrams
				},
				fats: {
					ratio: macrosRatioFields[macros].fats,
					calories: fatsCalories,
					grams: fatsGrams
				}
			}
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
export default reduxForm({
	form: "calForm"
})(Calculation);
