import React from "react";
import { renderSelect } from "../renderInputs";
import { Field } from "redux-form";
import { MenuItem } from "@material-ui/core";
import { macrosRatioFields } from "../data/selectFieldData";

const MacrosRatio = () => {
	const macroRatioOptions = macrosRatioFields.map(
		({ value, proteinsRatio, carbsRatio, fatsRatio }, index) => {
			return (
				<MenuItem key={value} value={value}>
					{`${proteinsRatio}% P, ${carbsRatio}% C, ${fatsRatio}% F`}
				</MenuItem>
			);
		}
	);
	return (
		<Field
			name="macros"
			component={renderSelect}
			menuItems={macroRatioOptions}
			variant="outlined"
		/>
	);
};

export default MacrosRatio;
