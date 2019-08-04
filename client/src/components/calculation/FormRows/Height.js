import React from "react";
import { renderField } from "../renderInputs";
import { Field } from "redux-form";
import { Grid, InputAdornment } from "@material-ui/core";

const Height = ({ unit, validateBigUnit, validateSmallUnit }) => {
	const bigUnit = unit === 0 ? "ft" : "m";
	const smallUnit = unit === 0 ? "in" : "cm";
	return (
		<Grid container direction="row">
			<Grid item xs={6}>
				<Field
					style={{ marginRight: 2.5 }}
					name="heightBig"
					component={renderField}
					variant="outlined"
					validate={validateBigUnit}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">{bigUnit}</InputAdornment>
						)
					}}
				/>
			</Grid>
			<Grid item xs={6}>
				<Field
					style={{ marginLeft: 2.5 }}
					name="heightSmall"
					component={renderField}
					variant="outlined"
					validate={validateSmallUnit}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">{smallUnit}</InputAdornment>
						)
					}}
				/>
			</Grid>
		</Grid>
	);
};

export default Height;
