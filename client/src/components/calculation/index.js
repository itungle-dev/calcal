import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { Grid, Paper, Tabs, Tab } from "@material-ui/core";
import DetailForm from "./DetailForm";
import Result from "./Result";
import * as calcMethods from "../../utils/calculationMethods";

class Calculation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tabUnit: 0,
			showResult: false,
			age: 0,
			gender: "",
			weight: 0,
			height_ft: 0,
			height_in: 0,
			height_cm: 0,
			weightInKilo: 0,
			heightInCm: 0,
			maintenanceDailyCalories: 0,
			maintenanceWeeklyCalories: 0,
			cuttingDailyCalories: 0,
			cuttingWeeklyCalories: 0,
			bulkingDailyCalories: 0,
			bulkingWeeklyCalories: 0
		};
	}

	handleCalculation = (values, thunk, props) => {
		const {
			age,
			gender,
			weight,
			height_ft,
			height_in,
			height_cm,
			activity
		} = values;

		const weightInKilo =
			this.state.tabUnit === 0
				? calcMethods.convertWeightToKilo(weight)
				: parseInt(weight);

		const heightInCm =
			this.state.tabUnit === 0
				? calcMethods.convertHeightToCm(height_in, height_ft)
				: parseInt(height_cm);

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

		const prevShowResult = this.state.showResult;

		this.setState({
			showResult: !prevShowResult,
			age: age,
			gender: gender,
			weight: weight,
			height_ft: height_ft,
			height_in: height_in,
			height_cm: height_cm,
			weightInKilo: weightInKilo,
			heightInCm: heightInCm,
			maintenanceDailyCalories: maintenanceDailyCalories,
			maintenanceWeeklyCalories: maintenanceWeeklyCalories,
			cuttingDailyCalories: cuttingDailyCalories,
			cuttingWeeklyCalories: cuttingWeeklyCalories,
			bulkingDailyCalories: bulkingDailyCalories,
			bulkingWeeklyCalories: bulkingWeeklyCalories
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
					<Paper square>
						<Tabs
							value={this.state.tabUnit}
							onChange={this.handleTabChange}
							indicatorColor="primary"
							textColor="primary"
							centered
						>
							<Tab label="US Units" />
							<Tab label="Metric Units" />
						</Tabs>
					</Paper>
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
