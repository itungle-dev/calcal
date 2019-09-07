import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Container } from "@material-ui/core";

import Header from "./Header";

import Calculation from "./calculation/Calculation";
import Profile from "./Profile";

const ProgressTracker = () => <h2>ProgressTracker</h2>;
const About = () => <h2>About</h2>;

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		console.log("App props", this.props);
		return (
			<BrowserRouter>
				<Container maxWidth="lg">
					<Header />
					<Route exact={true} path="/" component={Calculation} />
					<Route exact={true} path="/progress" component={ProgressTracker} />
					<Route exact={true} path="/about" component={About} />
					<Route exact={true} path="/profile" component={Profile} />
				</Container>
			</BrowserRouter>
		);
	}
}

export default connect(
	null,
	actions
)(App);
