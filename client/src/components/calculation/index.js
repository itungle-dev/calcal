import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Grid } from "@material-ui/core";
import UnitTabs from "./UnitTabs";
import DetailForm from "./DetailForm";
import Result from "./Result";

class Calculation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tabUnit: 0,
			showResult: false
		};
	}

	handleTabChange = (event, value) => {
		this.setState({
			tabUnit: value
		});
	};

	handleResult = () => {
		this.setState(() => {
			return { showResult: true };
		});
	};

	displayUserResult = () => {
		return (
			<Grid item sm={8} style={{ height: "100%" }}>
				<Result
					tabUnit={this.state.tabUnit}
					onSave={values => console.log("in side onSave", values)}
				/>
			</Grid>
		);
	};

	render() {
		return (
			<Grid container spacing={3} justify="flex-start" alignItems="stretch">
				<Grid item sm={4}>
					<UnitTabs
						tabUnit={this.state.tabUnit}
						handleTabChange={this.handleTabChange}
					/>
					<DetailForm
						onSubmit={this.handleResult}
						tabUnit={this.state.tabUnit}
					/>
				</Grid>
				{this.displayUserResult()}
			</Grid>
		);
	}
}
function mapStateToProps(state, ownProps) {
	return {};
}

Calculation = connect(mapStateToProps)(Calculation);

export default reduxForm({
	form: "calForm"
})(Calculation);
