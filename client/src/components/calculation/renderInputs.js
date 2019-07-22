import React from "react";
import {
	TextField,
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
	Select,
	InputLabel,
	MenuItem
} from "@material-ui/core";

export const renderField = ({
	input,
	label,
	value,
	meta: { touched, error, invalid },
	...custom
}) => {
	// in material UI, TextField's error is a bool and helperText is String of
	// in ReduxForm, Field's invalid is a bool and error is a string of errors
	return (
		<TextField
			id={label}
			label={label}
			value={value}
			margin="dense"
			{...custom}
			{...input}
		/>
	);
};
export const renderRadio = ({ input, showLabel, ...custom }) => {
	const radioOptions = custom.radios.map(({ value, label }) => {
		return (
			<FormControlLabel
				key={value}
				value={value}
				control={<Radio />}
				label={label}
			/>
		);
	});

	return (
		<FormControl>
			{custom.showLabel && (
				<FormLabel component="legend">{custom.label}</FormLabel>
			)}
			<RadioGroup {...input} {...custom} row>
				{radioOptions}
			</RadioGroup>
		</FormControl>
	);
};

export const renderSelect = ({
	input,
	label,
	menuItems,
	showLabel,
	meta: { touched, error },
	children,
	...custom
}) => {
	const menuOptions = menuItems.map(({ value, label }) => {
		return (
			<MenuItem key={value} value={value}>
				{label}
			</MenuItem>
		);
	});

	return (
		<FormControl error={touched && error}>
			{custom.showLabel && <InputLabel>{label}</InputLabel>}
			<Select {...input} {...custom}>
				{menuOptions}
			</Select>
		</FormControl>
	);
};
