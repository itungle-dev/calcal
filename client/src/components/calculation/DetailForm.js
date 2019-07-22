import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import {
	Radio,
	FormControl,
	FormControlLabel,
	MenuItem,
	AppBar,
	Tabs,
	Tab,
	Paper,
	Grid,
	Box,
	InputAdornment,
	InputLabel,
	Typography,
	Button
} from "@material-ui/core";
import { renderField, renderRadio, renderSelect } from "./renderInputs";

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
						InputProps={{
							endAdornment: <InputAdornment position="end">ft</InputAdornment>
						}}
					/>
					<Field
						style={{ marginLeft: 2.5 }}
						name="height_in"
						component={renderField}
						variant="outlined"
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
			spacing: 1
		};

		const gridItemLabelProps = {
			item: true,
			sm: 2
		};

		const gridItemFieldProps = {
			item: true,
			sm: 10
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
		const genderRadios = [
			{ value: "male", label: "Male" },
			{ value: "female", label: "Female" }
		];

		const { pristine, submitting, reset, handleSubmit } = this.props;
		const ageField = (
			<Field name="age" component={renderField} fullWidth variant="outlined" />
		);
		const genderRadioField = (
			<Field
				name="gender"
				component={renderRadio}
				label="Gender"
				radios={genderRadios}
				showLabel={false}
			/>
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

export default reduxForm({
	form: "calForm"
})(DetailForm);
