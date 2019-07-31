import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
	Grid,
	Button,
	Typography,
	Paper,
	Box,
	GridList,
	GridListTile
} from "@material-ui/core";
import ResultCaloriesBox from "./ResultCaloriesBox";
import * as actions from "../../actions";

class Result extends Component {
	render() {
		const {
			tabUnit,
			age,
			gender,
			weight,
			height_ft,
			height_in,
			height_cm,
			maintenanceDailyCalories,
			maintenanceWeeklyCalories,
			cuttingDailyCalories,
			cuttingWeeklyCalories,
			bulkingDailyCalories,
			bulkingWeeklyCalories
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
				<Grid item xs={4}>
					<ResultCaloriesBox
						label={label}
						weeklyCalories={weeklyCaloriesList[index]}
						dailyCalories={dailyCaloriesList[index]}
					/>
				</Grid>
			);
		});

		const heightInput =
			tabUnit === 1
				? `${height_cm} cm`
				: height_ft
				? `${height_ft} ft ${height_in} in`
				: `${height_in} in`;

		const weightUnit = tabUnit === 0 ? `lbs` : `kgs`;

		return (
			<Paper square>
				<Box bgcolor="white" p={2}>
					<Typography variant="h5">Your Result</Typography>
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
							console.log("inside save button props", this.props);
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
