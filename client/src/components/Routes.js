import React from "react";
import RouteWithLayout from "./routes/RouteWithLayout";
import { Switch, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Calculation from "./calculation/Calculation";
import Profile from "./profile/Profile";
import MainLayout from "./layout/Main";

const Routes = props => {
	return (
		<Switch>
			<Redirect exact from="/" to="/calculation" />
			<RouteWithLayout
				exact
				path="/calculation"
				layout={MainLayout}
				component={Calculation}
			/>
			<RouteWithLayout
				exact
				path="/profile"
				layout={MainLayout}
				component={Profile}
			/>
		</Switch>
	);
};

Routes.propTypes = {};

export default Routes;
