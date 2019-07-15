import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Link } from "@material-ui/core";

class Header extends Component {
	renderDynamicHeader() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return (
					<Link href={"/auth/google"} style={{ padding: "10px" }}>
						Login with GOOGLE
					</Link>
				);
			default:
				return [
					<Link
						key="profile"
						component={RouterLink}
						to="/profile"
						style={{ padding: "10px" }}
					>
						Profile
					</Link>,
					<Link key="logout" href={"/api/logout"} style={{ padding: "10px" }}>
						Log Out
					</Link>
				];
		}
	}

	render() {
		return (
			<Fragment>
				<AppBar position="static" color="default" elevation={0}>
					<Toolbar style={{ flexWrap: "wrap" }}>
						<Typography variant="h5" color="inherit" style={{}}>
							CalCal
						</Typography>
						<nav>
							<Link component={RouterLink} to="/" style={{ padding: "10px" }}>
								Calculation
							</Link>
							<Link
								component={RouterLink}
								to="/progress"
								style={{ padding: "10px" }}
							>
								Progress Tracker
							</Link>
							<Link
								component={RouterLink}
								to="/about"
								style={{ padding: "10px" }}
							>
								About
							</Link>
							{this.renderDynamicHeader()}
						</nav>
					</Toolbar>
				</AppBar>
			</Fragment>
		);
	}
}

function mapStateToProps(state) {
	return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
