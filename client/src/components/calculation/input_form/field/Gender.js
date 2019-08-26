import React from "react";
import { Field } from "redux-form";
import { FormControlLabel, Radio } from "@material-ui/core";
import RenderRadio from "../../../renderFields/RenderRadioField";

const Gender = props => {
	return (
		<Field
			name="gender"
			component={RenderRadio}
			label="Gender"
			showLabel={false}
		>
			<FormControlLabel value="female" control={<Radio />} label="Female" />
			<FormControlLabel value="male" control={<Radio />} label="Male" />
		</Field>
	);
};

export default Gender;
