import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../actions";

class Result extends Component {
	render() {
		return (
			<div>
				<h3> Result </h3>
				<ul>
					<li>Age * 2: {this.props.age}</li>
					<li>Gender: {this.props.gender}</li>
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
