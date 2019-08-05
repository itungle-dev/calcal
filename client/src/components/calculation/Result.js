import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Button, Typography, Paper, Box } from "@material-ui/core";
import ResultCaloriesBox from "./ResultCaloriesBox";
import * as actions from "../../actions";
import ResultChart from "./ResultChart";

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

			macrosRatio
		} = this.props;

		const dailyCaloriesList = [
			maintenanceDailyCalories,
			cuttingDailyCalories,
			bulkingDailyCalories
		];

		const weeklyCaloriesList = [
			maintenanceWeeklyCalories,
			cuttingWeeklyCalories,
			bulkingWeeklyCalories
		];

		const phaseLabelList = ["Maintenance", "Cutting", "Bulking"];
		const resultBoxes = phaseLabelList.map((label, index) => {
			return (
				<Grid item xs={4} key={index}>
					<ResultCaloriesBox
						label={label}
						weeklyCalories={weeklyCaloriesList[index]}
						dailyCalories={dailyCaloriesList[index]}
					/>
				</Grid>
			);
		});

		let macrosData = [
			{ name: "Proteins", value: macrosRatio.proteins.ratio, color: "orange" },
			{ name: "Carbs", value: macrosRatio.carbs.ratio, color: "red" },
			{ name: "Fats", value: macrosRatio.fats.ratio, color: "green" }
		];

		const heightBigUnit = tabUnit === 0 ? "ft" : "m";
		const heightSmallUnit = tabUnit === 0 ? "in" : "cm";

		const heightInput = heightBig
			? `${heightBig} ${heightBigUnit} and ${heightSmall} ${heightSmallUnit}`
			: `${heightSmall} ${heightSmallUnit}`;

		const weightUnit = tabUnit === 0 ? `lbs` : `kgs`;

		return (
			<Paper square>
				<Box bgcolor="green" p={1}>
					<Typography variant="h5">Result</Typography>
				</Box>
				<Box p={2}>
					<Typography>
						As a {age} years old {gender} weighted {weight} {weightUnit} and{" "}
						{heightInput} tall
					</Typography>
				</Box>
				<Grid container justify="space-around" spacing={1}>
					{resultBoxes}
				</Grid>
				<Grid container justify="space-around" spacing={1}>
					<ResultChart data={macrosData} />;
				</Grid>
				<Box align="center" p={2}>
					<Button
						label="button"
						variant="outlined"
						color="primary"
						onClick={() => {
							const userDetails = {
								age: this.props.age,
								gender: this.props.gender
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

function mapStateToProps(ownProps) {
	const age = ownProps.age;
	const gender = ownProps.gender;
	return {
		age,
		gender
	};
}

export default connect(
	mapStateToProps,
	actions
)(Result);
