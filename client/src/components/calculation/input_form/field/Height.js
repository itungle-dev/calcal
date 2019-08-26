import React, { Fragment } from "react";
import { Field } from "redux-form";
import { Grid, InputAdornment } from "@material-ui/core";
import RenderTextField from "../../../renderFields/RenderTextField";

const Height = ({ unit, validateBigUnit, validateSmallUnit }) => {
	let height;
	if (unit === 0) {
		height = (
			<Grid container spacing={2}>
				<Grid item xs={6} md={6} lg={6} xl={6}>
					<Field
						name="heightFt"
						label="Height"
						component={RenderTextField}
						variant="outlined"
						validate={validateBigUnit}
						fullWidth
						InputLabelProps={{
							shrink: true
						}}
						InputProps={{
							endAdornment: <InputAdornment position="end">ft</InputAdornment>
						}}
					/>
				</Grid>
				<Grid item xs={6} md={6} lg={6} xl={6}>
					<Field
						fullWidth
						name="heightIn"
						component={RenderTextField}
						variant="outlined"
						validate={validateSmallUnit}
						InputProps={{
							endAdornment: <InputAdornment position="end">in</InputAdornment>
						}}
					/>
				</Grid>
			</Grid>
		);
	} else {
		height = (
			<Fragment>
				<Field
					name="heightCm"
					label="Height"
					component={RenderTextField}
					fullWidth
					variant="outlined"
					validate={validateBigUnit}
					InputLabelProps={{
						shrink: true
					}}
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
