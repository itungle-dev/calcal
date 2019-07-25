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
import { renderField, renderRadio } from "./renderInputs";

class DetailForm extends Component {
	// Render Weight TextField
	renderWeightField = tabIndex => {
		const weightUnits = ["lbs", "kgs"];
		const weightField = (
			<Field
				name="weight"
				component={renderField}
				fullWidth
				variant="outlined"
				validate={[required, isNumber]}
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
						validate={[required, isNumber]}
						InputProps={{
							endAdornment: <InputAdornment position="end">ft</InputAdornment>
						}}
					/>
					<Field
						style={{ marginLeft: 2.5 }}
						name="height_in"
						component={renderField}
						variant="outlined"
						validate={[required, isNumber]}
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
					validate={[required, isNumber]}
					InputProps={{
						endAdornment: <InputAdornment position="end">cm</InputAdornment>
					}}
				/>
			);
		return heightField;
	};

	// Render each row using Grid system
	renderFieldRow = (inputLabel, field) => {
		const gridContainerProps = {
			container: true,
			justify: "space-around",
			alignItems: "center",
			spacing: 3
		};

		const gridItemLabelProps = {
			item: true,
			sm: 3
		};

		const gridItemFieldProps = {
			item: true,
			sm: 9
		};

		return (
			<Grid {...gridContainerProps}>
				<Grid {...gridItemLabelProps}>
					<Typography align="right">{inputLabel}</Typography>
				</Grid>
				<Grid {...gridItemFieldProps}>{field}</Grid>
			</Grid>
		);
	};

	// Render all the rows
	renderForms = tabIndex => {
		const { pristine, submitting, reset, handleSubmit } = this.props;
		const ageField = (
			<Field
				name="age"
				component={renderField}
				fullWidth
				variant="outlined"
				validate={[required, isNumber]}
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
		return (
			<Paper>
				<form onSubmit={handleSubmit}>
					<Box p={2}>
						{this.renderFieldRow("Age", ageField)}
						{this.renderFieldRow("Gender", genderRadioField)}
						{this.renderFieldRow("Weight", this.renderWeightField(tabIndex))}
						{this.renderFieldRow("Height", this.renderHeightField(tabIndex))}
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
	console.log("required in ", value);
	return !value ? "Required" : undefined;
};
const isNumber = value =>
	value && isNaN(Number(value)) ? "Must be a number" : undefined;
const validate = (values, props) => {
	console.log("validate values", values);
	console.log("validate props", props);
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
		console.log("value", field, values[field]);
		if (field !== "gender" && values[field]) {
			if (isNumber(values[field])) {
				errors[field] = "Please enter a valid number";
			}
		}

		if (!values[field]) {
			if (field === "height_in" && values["height_ft"]) {
			} else if (field === "height_ft" && values["height_in"]) {
			} else {
				errors[field] = "Required";
			}
		}
	});

	console.log("validate errors", errors);
	return errors;
};

export default reduxForm({
	form: "calForm",
	validate: validate,
	destroyOnUnmount: false
})(DetailForm);
