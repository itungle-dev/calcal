import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { renderField } from "./renderInputs";

class DetailForm extends Component {
	render() {
		const { pristine, submitting, reset, handleSubmit } = this.props;
		return (
			<div>
				<h3>DetaiLForm</h3>
				<form onSubmit={handleSubmit}>
					<div>
						<Field name="age" component={renderField} label="Age" />
					</div>
					<label>Sex</label>
					<div>
						<label>
							<Field name="sex" component="input" type="radio" value="male" />{" "}
							Male
						</label>
						<label>
							<Field name="sex" component="input" type="radio" value="female" />{" "}
							Female
						</label>
						<label>
							<Field name="sex" component="input" type="radio" value="none" />{" "}
							Prefer not answer
						</label>
					</div>
					<div>
						<label>Height</label>
						<Field name="height" component="input" label="Height" />
						<div>
							<label>
								<Field
									name="height_unit"
									component="input"
									type="radio"
									value="feet"
								/>{" "}
								feet
							</label>
							<label>
								<Field
									name="height_unit"
									component="input"
									type="radio"
									value="cm"
								/>{" "}
								cm
							</label>
						</div>
					</div>
					<div>
						<label>Weight</label>
						<Field name="weight" component="input" label="weight" />
						<div>
							<label>
								<Field
									name="weight_unit"
									component="input"
									type="radio"
									value="lbs"
								/>{" "}
								lbs
							</label>
							<label>
								<Field
									name="weight_unit"
									component="input"
									type="radio"
									value="kgs"
								/>{" "}
								kgs
							</label>
						</div>
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
