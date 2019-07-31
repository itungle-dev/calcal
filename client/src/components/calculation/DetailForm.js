import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import {
	Paper,
	Grid,
	Box,
	InputAdornment,
	Typography,
	Button,
	FormControlLabel,
	Radio
} from "@material-ui/core";
import { renderField, renderRadio, renderSelect } from "./renderInputs";
import FieldRow from "./FieldRow";

class DetailForm extends Component {
	constructor(props) {
		super(props);
		this.props.initialize({ activity: 1.2 });
	}

	// Render Weight TextField
	renderWeightField = tabIndex => {
		const weightUnits = ["lbs", "kgs"];
		const weightField = (
			<Field
				name="weight"
				component={renderField}
				fullWidth
				variant="outlined"
				validate={[required, isNumber, isWeightInRange]}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							{weightUnits[tabIndex]}
						</InputAdornment>
					)
				}}
			/>
		);
		return weightField;
	};
	// Render Height TextField based on US/Metric unit
	renderHeightField = tabIndex => {
		const heightField =
			tabIndex === 0 ? (
				<div style={{ display: "flex" }}>
					<Field
						style={{ marginRight: 2.5 }}
						name="height_ft"
						component={renderField}
						variant="outlined"
						validate={[isNumber, isHeightFtInRange]}
						InputProps={{
							endAdornment: <InputAdornment position="end">ft</InputAdornment>
						}}
					/>
					<Field
						style={{ marginLeft: 2.5 }}
						name="height_in"
						component={renderField}
						variant="outlined"
						validate={[isNumber, isHeightInchInRange]}
						InputProps={{
							endAdornment: <InputAdornment position="end">in</InputAdornment>
						}}
					/>
				</div>
			) : (
				<Field
					name="height_cm"
					component={renderField}
					fullWidth
					variant="outlined"
					validate={[required, isNumber, isHeightCmInRange]}
					InputProps={{
						endAdornment: <InputAdornment position="end">cm</InputAdornment>
					}}
				/>
			);
		return heightField;
	};

	// Render all the rows
	renderForms = tabIndex => {
		const activities = [
			{ label: "Little or no exercise", value: 1.2 },
			{ label: "Exercise 1-3 times/week", value: 1.375 },
			{ label: "Exercise 3-5 times/week", value: 1.55 },
			{ label: "Exercise 6-7 times/week", value: 1.725 },
			{ label: "Exercise 9+ times/week", value: 2.0 }
		];

		const gridContainerProps = {
			container: true,
			justify: "space-around",
			alignItems: "center",
			spacing: 2
		};

		const gridItemLabelProps = {
			item: true,
			sm: 3
		};

		const gridItemFieldProps = {
			item: true,
			sm: 9
		};

		const { pristine, submitting, reset, handleSubmit } = this.props;
		const ageField = (
			<Field
				name="age"
				component={renderField}
				fullWidth
				variant="outlined"
				validate={[required, isNumber, isAgeInRange]}
			/>
		);
		const genderRadioField = (
			<Field
				name="gender"
				component={renderRadio}
				label="Gender"
				showLabel={false}
			>
				<FormControlLabel value="female" control={<Radio />} label="Female" />
				<FormControlLabel value="male" control={<Radio />} label="Male" />
			</Field>
		);

		const activitySelectField = (
			<Field
				name="activity"
				component={renderSelect}
				menuItems={activities}
				variant="outlined"
				value={1.2}
			/>
		);
		const weightField = this.renderWeightField(tabIndex);
		const heightField = this.renderHeightField(tabIndex);
		const labelsList = ["Age", "Gender", "Weight", "Height", "Activity level"];
		const fieldsList = [
			ageField,
			genderRadioField,
			weightField,
			heightField,
			activitySelectField
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
const required = value => {
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
		? `Must be a number ${validNumberMsg}`
		: undefined;
};

const isAgeInRange = value => isNumInRange(value, 13, 90);
const isWeightInRange = value => isNumInRange(value, 20);
const isHeightInchInRange = value => isNumInRange(value, 0, 100);
const isHeightFtInRange = value => isNumInRange(value, 0, 9);
const isHeightCmInRange = value => isNumInRange(value, 20, 275);

const validate = (values, props) => {
	const errors = {};
	const requiredFields = [
		"age",
		"gender",
		"weight",
		"height_ft",
		"height_in",
		"height_cm"
	];
	requiredFields.forEach(field => {
		if (field !== "gender" && values[field]) {
			if (isNumber(values[field])) {
				errors[field] = "Please enter a valid number";
			}
		}
		if (
			(field === "height_in") & (Number(values["height_ft"]) >= 1) &&
			Number([values.height_in]) > 12
		) {
			errors["height_in"] = "Must be a number between 0 and 12";
		}

		if (!values[field]) {
			if (field === "height_in" && values["height_ft"]) {
			} else if (field === "height_ft" && values["height_in"]) {
			} else {
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
