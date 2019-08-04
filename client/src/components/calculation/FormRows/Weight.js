import React from "react";
import { renderField } from "../renderInputs";
import { Field } from "redux-form";
import { InputAdornment } from "@material-ui/core";

const Weight = ({ unit, validate }) => {
	const weightUnits = ["lbs", "kgs"];
	return (
		<Field
			name="weight"
			component={renderField}
			fullWidth
			variant="outlined"
			validate={validate}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">{weightUnits[unit]}</InputAdornment>
				)
			}}
		/>
	);
};

export default Weight;
