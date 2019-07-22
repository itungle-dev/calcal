import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../actions";

class Result extends Component {
	render() {
		return (
			<div>
				<h3> Result </h3>
				<ul>
					<li>Age: {this.props.age}</li>
					<li>Gender: {this.props.gender}</li>
					<li>Weight: {this.props.weight}</li>
					<li>Height_ft: {this.props.height_ft}</li>
					<li>Height_in: {this.props.height_in}</li>
					<li>Height_cm: {this.props.height_cm}</li>
					<li>Weight in Kilo: {this.props.weightInKilo}</li>
					<li>Height in Cm: {this.props.heightInCm}</li>
				</ul>
				<button
					label="button"
					onClick={() => {
						const userDetails = {
							age: this.props.age,
							gender: this.props.gender
						};
						console.log("inside save button props", this.props);
						return this.props.saveDetails(userDetails);
					}}
				>
					Save
				</button>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	const age = ownProps.age;
	const gender = ownProps.gender;
	return {
		age,
		gender
	};
}

export default connect(
	mapStateToProps,
	actions
)(Result);
