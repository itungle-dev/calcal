import React, { Component } from "react";
import { reduxForm } from "redux-form";

import DetailForm from "./DetailForm";
import Result from "./Result";

class Calculation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			age: "",
			gender: ""
		};
	}

	calculateValue(values) {
		const { age, gender } = values;
		const updatedAge = age * 2;
		const genValue = gender == "male" ? 100 : 90;
		this.setState({
			age: updatedAge,
			gender: genValue
		});
	}

	render() {
		return (
			<div>
				<DetailForm onSubmit={values => this.calculateValue(values)} />
				<Result {...this.state} />
			</div>
		);
	}
}
export default reduxForm({
	form: "calForm"
})(Calculation);
