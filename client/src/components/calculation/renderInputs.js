import React from "react";
import { TextField } from "@material-ui/core";

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
			<TextField
				id={label}
				label={label}
				value={value}
				margin="normal"
				variant="outlined"
			/>
		</div>
	);
};
