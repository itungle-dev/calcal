import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

const inlineStyle = {
	display: "inline-block"
};

const Header = () => <h2>Header</h2>;
const Dashboard = () => <h2 style={inlineStyle}>Dashboard</h2>;
const Result = () => <h2 style={inlineStyle}>Result</h2>;
const ViewProgress = () => <h2>View Progress</h2>;

class App extends Component {
	render() {
		return (
			<div>
				<BrowserRouter>
					<div>
						<Header />
						<Route exact={true} path="/" component={Dashboard} />
						<Route exact={true} path="/" component={Result} />
						<Route
							exact={true}
							path="/view_progress"
							component={ViewProgress}
						/>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
