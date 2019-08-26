import React from "react";
import { Field } from "redux-form";
import RenderTextField from "../../../renderFields/RenderTextField";

const Age = props => {
	return (
		<Field
			name="age"
			label="Age"
			component={RenderTextField}
			fullWidth
			variant="outlined"
			validate={props.validate}
			InputLabelProps={{
				shrink: true
			}}
		/>
	);
};

export default Age;
