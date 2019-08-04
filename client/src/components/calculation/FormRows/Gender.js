import React from "react";
import { Field } from "redux-form";
import { FormControlLabel, Radio } from "@material-ui/core";
import { renderRadio } from "../renderInputs";

const Gender = props => {
	return (
		<Field
			name="gender"
			component={renderRadio}
			label="Gender"
			showLabel={false}
		>
			<FormControlLabel value="female" control={<Radio />} label="Female" />
			<FormControlLabel value="male" control={<Radio />} label="Male" />
		</Field>
	);
};

export default Gender;
