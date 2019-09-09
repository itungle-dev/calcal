import React from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles, Drawer, Divider } from "@material-ui/core";
import SideBarNav from "./SideBarNav";

const useStyles = makeStyles(theme => ({
	drawer: {
		width: 240,
		[theme.breakpoints.up("lg")]: {
			marginTop: 64,
			height: "calc(100% - 64px)"
		}
	},
	root: {
		backGroundColor: theme.palette.white,
		display: "flex",
		flexDirection: "column",
		height: "100%",
		padding: theme.spacing(2)
	},
	divider: {
		margin: theme.spacing(2, 0)
	}
}));

const SideBar = props => {
	const { open, variant, onClose, className, auth, dispatch, ...rest } = props;
	const classes = useStyles();
	const dynamicNavPage = () => {
		switch (auth) {
			case null:
				return [];
			case false:
				return [
					{
						title: "Login with Google",
						href: "/auth/google",
						icon: "none",
						useAnchor: true
					}
				];
			default:
				return [
					{
						title: "Profile",
						href: "/profile",
						icon: "none",
						useAnchor: false
					},
					{
						title: "Logout",
						href: "/api/logout",
						icon: "none",
						useAnchor: true
					}
				];
		}
	};

	const navPages = [
		{
			title: "Calculation",
			href: "/calculation",
			icon: "none",
			useAnchor: false
		},
		...dynamicNavPage()
	];

	return (
		<Drawer
			anchor="left"
			classes={{ paper: classes.drawer }}
			onClose={onClose}
			open={open}
			variant={variant}
		>
			<div {...rest} className={clsx(classes.root, className)}>
				<Divider className={classes.divider} />
				<SideBarNav className={classes.nav} navPages={navPages} />
			</div>
		</Drawer>
	);
};

SideBar.propTypes = {};

function mapStateToProps(state) {
	return { auth: state.auth };
}

export default connect(mapStateToProps)(SideBar);
