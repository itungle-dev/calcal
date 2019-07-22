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
			heightInCm: 0
		};
	}

	handleCalculation = (values, props) => {
		// console.log("cal val event", event);
		console.log("cal val values", values);
		console.log("cal val unit", props);

		const { age, gender, weight, height_ft, height_in, height_cm } = values;

		const weightInKilo =
			this.state.tabUnit === 0
				? calcMethods.convertWeightToKilo(weight)
				: weight;

		const heightInCm =
			this.state.tabUnit === 0
				? calcMethods.convertHeightToCm(height_ft, height_in)
				: height_cm;

		this.setState({
			age: age,
			gender: gender,
			weight: weight,
			height_ft: height_ft,
			height_in: height_in,
			height_cm: height_cm,
			weightInKilo: weightInKilo,
			heightInCm: heightInCm
		});
	};

	handleTabChange = (event, value) => {
		this.setState({
			tabUnit: value
		});
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
				<Grid item sm={8}>
					<Result {...this.state} onSave={values => console.log(values)} />
				</Grid>
			</Grid>
		);
	}
}
export default reduxForm({
	form: "calForm"
})(Calculation);
