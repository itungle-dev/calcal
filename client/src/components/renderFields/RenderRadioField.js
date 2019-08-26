import React from "react";
import { FormControl, RadioGroup, FormHelperText } from "@material-ui/core";

function RenderRadio({
	input,
	showLabel,
	children,
	meta: { touched, error },
	...custom
}) {
	const errorBool = error ? true : false;
	return (
		<FormControl error={touched && errorBool}>
			<RadioGroup {...input} {...custom} row>
				{children}
				{touched && error && (
					<FormHelperText>{touched && error}</FormHelperText>
				)}
			</RadioGroup>
		</FormControl>
	);
}

export default RenderRadio;
