import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Container } from "@material-ui/core";

import Header from "./Header";

import Calculation from "./calculation/Calculation";
// import Profile from "./profile/Profile";
import Routes from "./Routes";
class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<BrowserRouter>
				<Routes />
			</BrowserRouter>
		);
	}
}

export default connect(
	null,
	actions
)(App);
