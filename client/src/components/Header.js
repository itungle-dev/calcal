import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
	AppBar,
	Toolbar,
	Typography,
	Link,
	IconButton,
	Drawer,
	Divider,
	List,
	ListItem,
	ListItemText
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
class Header extends Component {
	constructor() {
		super();
		this.state = {
			showMenuIcon: false,
			setOpen: false
		};
	}

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

	handleDrawerToggle = () => {
		this.setState(prevState => {
			return {
				setOpen: !prevState.setOpen
			};
		});
	};

	render() {
		return (
			<Fragment>
				<AppBar position="sticky" color="default" elevation={1}>
					<Toolbar style={{ flexWrap: "wrap" }}>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={this.handleDrawerToggle}
							edge="start"
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h5" color="inherit" style={{}}>
							CalCal
						</Typography>
						<nav>
							<Link component={RouterLink} to="/" style={{ padding: "10px" }}>
								Calculation
							</Link>
							{/* <Link
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
							</Link> */}
							{this.renderDynamicHeader()}
						</nav>
					</Toolbar>
				</AppBar>
				<Drawer
					variant="persistent"
					anchor="left"
					open={this.state.setOpen}
					classes={{}}
				>
					<div>
						<IconButton onClick={this.handleDrawerToggle}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<List>
						{["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
							<ListItem button key={text}>
								<ListItemIcon>
									{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						))}
					</List>
					<Divider />
					<List>
						{["All mail", "Trash", "Spam"].map((text, index) => (
							<ListItem button key={text}>
								<ListItemIcon>
									{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						))}
					</List>
				</Drawer>
			</Fragment>
		);
	}
}

function mapStateToProps(state) {
	return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
