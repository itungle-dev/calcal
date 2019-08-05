import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { Paper, Grid, Box, Typography, Button } from "@material-ui/core";
import FieldRow from "./FieldRow";
import Age from "./FormRows/Age";
import Gender from "./FormRows/Gender";
import Weight from "./FormRows/Weight";
import Height from "./FormRows/Height";
import Goal from "./FormRows/Goal";
import ActivityLevel from "./FormRows/ActivityLevel";
import MacrosRatio from "./FormRows/MacrosRatio";

class DetailForm extends Component {
	constructor(props) {
		super(props);
		this.props.initialize({ activity: 1.2, goal: 0, macros: 0 });
	}

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
			"Activity level",
			"Goal",
			"Macronutrients Ratio"
		];
		const validateAge = [isRequired, isNumber, isAgeInRange];
		const validateWeight = [isRequired, isNumber, isWeightInRange];
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
			<Goal />,
			<MacrosRatio />
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
const isWeightInRange = value => isNumInRange(value, 20);

const validate = (values, props) => {
	let errors = {};
	const requiredFields = [
		"age",
		"gender",
		"weight",
		"heightBig",
		"heightSmall"
	];

	requiredFields.forEach(field => {
		if (field !== "gender" && values[field]) {
			if (isNumber(values[field])) {
				errors[field] = "Please enter a valid number";
			}
		}

		if (!values[field]) {
			if (
				!(
					(field === "heightSmall" && values["heightBig"]) ||
					(field === "heightBig" && values["heightSmall"])
				)
			) {
				errors[field] = "Required";
			}
		}
	});

	return errors;
};

export default reduxForm({
	form: "calForm",
	validate: validate,
	destroyOnUnmount: false
})(DetailForm);
