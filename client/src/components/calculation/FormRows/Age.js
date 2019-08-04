import React from "react";
import { Field } from "redux-form";
import { renderField } from "../renderInputs";

const Age = props => {
	return (
		<Field
			name="age"
			component={renderField}
			fullWidth
			variant="outlined"
			validate={props.validate}
		/>
	);
};

export default Age;
