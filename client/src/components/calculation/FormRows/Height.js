import React, { Fragment } from "react";
import { renderField } from "../renderInputs";
import { Field } from "redux-form";
import { Grid, InputAdornment } from "@material-ui/core";

const Height = ({ unit, validateBigUnit, validateSmallUnit }) => {
	let height;
	if (unit === 0) {
		height = (
			<Fragment>
				<Grid item xs={6}>
					<Field
						style={{ marginRight: 2.5 }}
						name="heightFt"
						component={renderField}
						variant="outlined"
						validate={validateBigUnit}
						InputProps={{
							endAdornment: <InputAdornment position="end">ft</InputAdornment>
						}}
					/>
				</Grid>
				<Grid item xs={6}>
					<Field
						style={{ marginLeft: 2.5 }}
						name="heightIn"
						component={renderField}
						variant="outlined"
						validate={validateSmallUnit}
						InputProps={{
							endAdornment: <InputAdornment position="end">in</InputAdornment>
						}}
					/>
				</Grid>
			</Fragment>
		);
	} else {
		height = (
			<Fragment>
				<Field
					name="heightCm"
					component={renderField}
					fullWidth
					variant="outlined"
					validate={validateBigUnit}
					InputProps={{
						endAdornment: <InputAdornment position="end">cm</InputAdornment>
					}}
				/>
			</Fragment>
		);
	}

	return (
		<Grid container direction="row">
			{height}
		</Grid>
	);
};

export default Height;
