import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Radio } from "@material-ui/core";
import { renderField, renderRadio, renderSelect } from "./renderInputs";

class DetailForm extends Component {
	render() {
		const genderRadios = [
			{ value: "male", label: "Male" },
			{ value: "female", label: "Female" },
			{ value: "none", label: "N/A" }
		];

		const { pristine, submitting, reset, handleSubmit } = this.props;
		return (
			<div>
				<h3>DetaiLForm</h3>
				<form onSubmit={handleSubmit}>
					<div>
						<Field name="age" component={renderField} label="Age" />
					</div>

					<div>
						<Field
							name="gender"
							component={renderRadio}
							label="Gender"
							radios={genderRadios}
							showLabel={false}
						/>
					</div>
					<div>
						<Field
							name="weight_unit"
							component={renderSelect}
							label="Weight"
							showLabel={false}
						>
							<option value="lbs">Pounds</option>
							<option value="kgs">Kilos</option>
						</Field>
					</div>
					<button
						type="button"
						disabled={pristine || submitting}
						onClick={reset}
					>
						Clear
					</button>
					<button type="submit" label="submit">
						Calculate
					</button>
				</form>
			</div>
		);
	}
}

export default reduxForm({
	form: "calForm"
})(DetailForm);
