import React from "react";
import { Grid, Typography } from "@material-ui/core";

const FieldRow = ({
	containerProps,
	itemFieldProps,
	itemLabelProps,
	label,
	field
}) => {
	return (
		<Grid {...containerProps}>
			<Grid {...itemLabelProps}>{label}</Grid>
			<Grid {...itemFieldProps}>{field}</Grid>
		</Grid>
	);
};

export default FieldRow;
