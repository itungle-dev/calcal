import React from "react";
import {
	FormControl,
	InputLabel,
	Select,
	OutlinedInput,
	FilledInput,
	FormHelperText
} from "@material-ui/core";

function RenderSelectField({
	input,
	label,
	variant,
	menuItems,
	margin,
	meta: { touched, error },
	children,
	...custom
}) {
	const { name } = input;
	const inputLabel = React.useRef(null);
	const [labelWidth, setLabelWidth] = React.useState(0);
	React.useEffect(() => {
		setLabelWidth(inputLabel.current.offsetWidth);
	}, []);

	const selectInput =
		variant === "outlined" ? (
			<OutlinedInput
				name={name}
				labelWidth={labelWidth}
				id={`${variant}-${name}-input`}
				{...input}
			/>
		) : variant === "filled" ? (
			<FilledInput name={name} {...input} id={`${variant}-${name}-input`} />
		) : (
			{ ...input }
		);

	return (
		<FormControl
			variant={variant}
			error={touched && error}
			style={{ width: "100%" }}
			margin={margin}
		>
			<InputLabel ref={inputLabel} htmlFor={`${variant}-${name}-input`}>
				{label}
			</InputLabel>
			<Select input={selectInput} {...custom}>
				{menuItems}
			</Select>
			{touched && error && <FormHelperText>{touched && error}</FormHelperText>}
		</FormControl>
	);
}

export default RenderSelectField;
