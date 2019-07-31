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
	MenuItem,
	FormHelperText
} from "@material-ui/core";
import color from "@material-ui/core/colors/purple";

export const renderField = ({
	input,
	label,
	value,
	type,
	meta,
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
			type={type}
			error={touched && invalid}
			helperText={touched && error}
			{...custom}
			{...input}
		/>
	);
};
export const renderRadio = ({
	input,
	showLabel,
	children,
	meta: { touched, error },
	...custom
}) => {
	const errorBool = error ? true : false;
	return (
		<FormControl error={touched && errorBool}>
			<RadioGroup {...input} {...custom} row>
				{children}
				{renderFromHelper({ touched, error })}
			</RadioGroup>
		</FormControl>
	);
};

export const renderSelect = ({
	input,
label,
	menuItems,
	showLabel,
	variant,
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
		<FormControl
			error={touched && error}
			variant={variant}
			style={{ width: "100%" }}
		>
			{custom.showLabel && <InputLabel>{label}</InputLabel>}
			<Select {...input} {...custom}>
				{menuOptions}
			</Select>
			{renderFromHelper({ touched, error })}
		</FormControl>
	);
};

const renderFromHelper = ({ touched, error }) => {
	if (!(touched && error)) {
		return;
	} else {
		return <FormHelperText>{touched && error}</FormHelperText>;
	}
};
