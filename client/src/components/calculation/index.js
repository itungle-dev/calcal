import React, { Component } from "react";
import { connect } from "react-redux";

import DetailForm from "./DetailForm";

class Calculation extends Component {
	render() {
		return (
			<div>
				<DetailForm />
			</div>
		);
	}
}

function mapStateToProps(state) {}

export default connect(mapStateToProps)(Calculation);
