import React from "react";
import { Field } from "redux-form";
import { MenuItem } from "@material-ui/core";
import { GOAL_LABELS } from "../../../../data/selectFieldData";
import RenderSelectField from "../../../renderFields/RenderSelectField";

const Goal = ({ handleGoalChange }) => {
	const goalOptions = GOAL_LABELS.map(({ label, value }, index) => {
		return (
			<MenuItem key={value} value={value}>
				{label}
			</MenuItem>
		);
	});

	return (
		<Field
			name="goal"
			label="Goal"
			component={RenderSelectField}
			menuItems={goalOptions}
			onChange={handleGoalChange}
			variant="outlined"
			margin="dense"
		/>
	);
};

export default Goal;
