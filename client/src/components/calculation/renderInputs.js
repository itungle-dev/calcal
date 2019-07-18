import React from "react";
import {
	TextField,
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
	Select,
	InputLabel
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
		<div>
			<TextField id={label} label={label} value={value} margin="normal" />
		</div>
	);
};
export const renderRadio = ({ input, ...custom }) => {
	const radios = custom.radios.map(({ value, label }) => {
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
		<FormControl variant="filled">
			{custom.showLabel && (
				<FormLabel component="legend">{custom.label}</FormLabel>
			)}
			<RadioGroup {...input} {...custom} row>
				{radios}
			</RadioGroup>
		</FormControl>
	);
};

export const renderSelect = ({
	input,
	label,
	meta: { touched, error },
	children,
	...custom
}) => {
	return (
		<FormControl error={touched && error}>
			{custom.showLabel && <InputLabel>{label}</InputLabel>}
			<Select native {...input} {...custom}>
				{children}
			</Select>
		</FormControl>
	);
};
