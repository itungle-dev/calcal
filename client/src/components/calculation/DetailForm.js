import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class DetailForm extends Component {
	render() {
		return (
			<div>
				<form />
				<h3>DetaiLForm</h3>
			</div>
		);
	}
}

export default reduxForm({
	form: "detailForm"
})(DetailForm);
