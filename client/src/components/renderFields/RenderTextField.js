import React from "react";
import { TextField } from "@material-ui/core";
function RenderTextField({
	input,
	label,
	value,
	type,
	meta,
	meta: { touched, error, invalid },
	...custom
}) {
	// in material UI, TextField's error is a bool and helperText is String of
	// in ReduxForm, Field's invalid is a bool and error is a string of errors
	return (
		<TextField
			id={label}
			label={label}
			value={value}
			margin="dense"
			variant="outlined"
			type={type}
			error={touched && invalid}
			helperText={touched && error}
			{...custom}
			{...input}
		/>
	);
}

export default RenderTextField;
