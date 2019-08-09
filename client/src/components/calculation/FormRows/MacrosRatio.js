import React from "react";
import { renderSelect } from "../renderInputs";
import { Field } from "redux-form";
import { MenuItem } from "@material-ui/core";
import { MACROS_RATIOS } from "../data/selectFieldData";

const MacrosRatio = () => {
	const macroRatioOptions = MACROS_RATIOS.map(
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
