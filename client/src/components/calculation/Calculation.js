import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Grid, CircularProgress } from "@material-ui/core";
import UnitTabs from "./input_form/UnitTabs";
import DetailForm from "./input_form/DetailForm";
import Result from "./result/Result";
import UserForm from "./UserForm";
import { withStyles } from "@material-ui/styles";

const useStyles = theme => ({
	root: { padding: theme.spacing(4) }
});
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
			<Grid item xs={12} sm={7} md={8} style={{ height: "100%" }}>
				<Result tabUnit={this.state.tabUnit} />
			</Grid>
		);
	};

	render() {
		const {
			auth: { isLoading }
		} = this.props;
		if (isLoading) {
			return null;
		}
		return (
			<div>
				<Grid container spacing={3} justify="flex-start" alignItems="stretch">
					<Grid item xs={12} sm={5} md={4}>
						<UserForm
							tabUnit={this.state.tabUnit}
							handleTabChange={this.handleTabChange}
							handleResult={this.handleResult}
							calculationOrProfile="calculation"
						/>
					</Grid>
					{this.state.showResult && this.displayUserResult()}
				</Grid>
			</div>
		);
	}
}
function mapStateToProps(state, ownProps) {
	return {
		auth: state.auth
	};
}
Calculation = withStyles(useStyles)(Calculation);
Calculation = connect(mapStateToProps)(Calculation);

export default reduxForm({
	form: "calForm"
})(Calculation);
