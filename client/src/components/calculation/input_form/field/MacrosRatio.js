import React from "react";
import { Field } from "redux-form";
import { MenuItem } from "@material-ui/core";
import { MACROS_RATIOS } from "../../../../data/selectFieldData";
import RenderSelectField from "../../../renderFields/RenderSelectField";

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
			label="Macros Ratio"
			component={RenderSelectField}
			menuItems={macroRatioOptions}
			variant="outlined"
			margin="dense"
		/>
	);
};

export default MacrosRatio;
