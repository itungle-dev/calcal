import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, change } from "redux-form";
import { Paper, Grid, Box, Typography, Button } from "@material-ui/core";
import FieldRow from "./FieldRow";
import Age from "./FormRows/Age";
import Gender from "./FormRows/Gender";
import Weight from "./FormRows/Weight";
import Height from "./FormRows/Height";
import Goal from "./FormRows/Goal";
import ActivityLevel from "./FormRows/ActivityLevel";
import MacrosRatio from "./FormRows/MacrosRatio";
import GoalPace from "./FormRows/GoalPace";
import * as calcMethods from "../../utils/calculationMethods";

class DetailForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			goal: 0
		};
		this.props.initialize({
			activity: 1.2,
			goal: 0,
			macros: 0,
			goalPace: 0,
			gender: "female"
		});
	}

	componentDidUpdate = (prevProps, prevState) => {
		if (prevProps.tabUnit !== this.props.tabUnit) {
			const { change, tabUnit } = this.props;
			const { weight, heightFt, heightIn, heightCm } = this.props.formValues;

			// tabUnit === 0, then number need to convert to IMPERIAL.
			// tabUnit === 1, then number needs to convert to METRIC.
			if (weight) {
				const weightConverted =
					tabUnit === 0
						? calcMethods.convertWeightToPound(weight)
						: calcMethods.convertWeightToKilo(weight);
				change("calForm", "weight", weightConverted);
			}

			if (tabUnit === 0) {
				if (heightCm) {
					const heightConvertedToImperial = calcMethods.convertHeightMetricToImperial(
						heightCm
					);
					change("calForm", "heightFt", heightConvertedToImperial.feet);
					change("calForm", "heightIn", heightConvertedToImperial.inches);
				}
			} else {
				if (heightFt || heightIn) {
					const heightConvertedCm = calcMethods.convertHeightToCm(
						heightFt,
						heightIn
					);
					change("calForm", "heightCm", heightConvertedCm);
				}
			}
		}
	};

	handleGoalChange = (event, value) => {
		this.setState({
			goal: value
		});
	};

	renderForms = tabIndex => {
		const gridContainerProps = {
			container: true,

			alignItems: "center",
			spacing: 2
		};

		const gridItemLabelProps = {
			item: true,
			sm: 4
		};

		const gridItemFieldProps = {
			item: true,
			sm: 8
		};

		const { pristine, submitting, reset, handleSubmit } = this.props;

		const labelsList = [
			"Age",
			"Gender",
			"Weight",
			"Height",
			"Activity Level",
			"Macros Ratio",
			"Goal"
		];
		const validateAge = [isRequired, isNumber, isAgeInRange];
		const validateWeight = [isRequired, isNumber];
		const validateNum = [isNumber];

		const fieldsList = [
			<Age validate={validateAge} />,
			<Gender />,
			<Weight unit={tabIndex} validate={validateWeight} />,
			<Height
				unit={tabIndex}
				validateBigUnit={validateNum}
				validateSmallUnit={validateNum}
			/>,
			<ActivityLevel />,
			<MacrosRatio />,
			<Goal handleGoalChange={this.handleGoalChange} />
		];
		const fieldRows = fieldsList.map((field, index) => {
			const labelTypograph = (
				<Typography align="right">{labelsList[index]}</Typography>
			);
			return (
				<FieldRow
					key={index}
					label={labelTypograph}
					field={field}
					containerProps={gridContainerProps}
					itemLabelProps={gridItemLabelProps}
					itemFieldProps={gridItemFieldProps}
				/>
			);
		});
		return (
			<Paper square>
				<form onSubmit={handleSubmit}>
					<Box p={2}>
						{fieldRows}
						{this.state.goal > 0 && (
							<FieldRow
								label={<Typography align="right">Goal Pace</Typography>}
								field={<GoalPace unit={tabIndex} goal={this.state.goal} />}
								containerProps={gridContainerProps}
								itemLabelProps={gridItemLabelProps}
								itemFieldProps={gridItemFieldProps}
							/>
						)}

						<Grid
							container
							spacing={3}
							justify="center"
							alignItems="center"
							style={{ paddingTop: 10 }}
						>
							<Grid item>
								<Button
									variant="outlined"
									color="secondary"
									disabled={pristine || submitting}
									onClick={reset}
								>
									Clear
								</Button>
							</Grid>
							<Grid item>
								<Button type="submit" variant="outlined" color="primary">
									Calculate
								</Button>
							</Grid>
						</Grid>
					</Box>
				</form>
			</Paper>
		);
	};

	render() {
		const { tabUnit } = this.props;
		return <div>{this.renderForms(tabUnit)}</div>;
	}
}
const isRequired = value => {
	return !value ? "Required" : undefined;
};
const isNumber = value =>
	value && isNaN(Number(value)) ? "Must be a number" : undefined;

const isNumInRange = (value, low = 0, high = Number.POSITIVE_INFINITY) => {
	const validNumberMsg =
		high === Number.POSITIVE_INFINITY
			? `greater or equal to ${low}`
			: `between ${low} and ${high}`;
	return value && !(Number(value) >= low && Number(value) <= high)
		? `Number ${validNumberMsg}`
		: undefined;
};

const isAgeInRange = value => isNumInRange(value, 13, 90);
// const isWeightInRange = value => isNumInRange(value, 1);

const validate = (values, props) => {
	const { tabUnit } = props;
	let errors = {};
	const requiredFields = [
		"age",
		"gender",
		"weight",
		"heightFt",
		"heightIn",
		"heightCm"
	];

	if (values["weight"]) {
		if (tabUnit === 0) {
			if (
				!(Number(values["weight"]) >= 20 && Number(values["weight"]) <= 2000)
			) {
				errors["weight"] = "Must be a number between 20 and 2000";
			}
		} else {
			if (!(Number(values["weight"]) > 10 && Number(values["weight"]) <= 907)) {
				errors["weight"] = "Must be a number between 10 and 907";
			}
		}
	}

	requiredFields.forEach(field => {
		if (field !== "gender" && values[field]) {
			if (isNumber(values[field])) {
				errors[field] = "Please enter a valid number";
			}
		}

		if (!values[field]) {
			if (
				!(
					(field === "heightIn" && values["heightFt"]) ||
					(field === "heightFt" && values["heightIn"])
				)
			) {
				errors[field] = "Required";
			}
		}
	});

	return errors;
};
function mapStateToProps(state) {
	return {
		formValues: state.form.calForm.values
	};
}
const mapDispatchToProps = {
	change
};
DetailForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(DetailForm);

export default reduxForm({
	form: "calForm",
	validate: validate
})(DetailForm);
