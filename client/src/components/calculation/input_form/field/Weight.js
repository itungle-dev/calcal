import React from "react";
import { Field } from "redux-form";
import { InputAdornment } from "@material-ui/core";
import RenderTextField from "../../../renderFields/RenderTextField";

const Weight = ({ unit, validate }) => {
	const weightUnits = ["lbs", "kgs"];
	return (
		<Field
			name="weight"
			label="Weight"
			component={RenderTextField}
			fullWidth
			variant="outlined"
			validate={validate}
			InputLabelProps={{
				shrink: true
			}}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">{weightUnits[unit]}</InputAdornment>
				)
			}}
		/>
	);
};

export default Weight;
