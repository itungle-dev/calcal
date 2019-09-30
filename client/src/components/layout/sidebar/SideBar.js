import React from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles, Drawer, Divider } from "@material-ui/core";
import SideBarNav from "./SideBarNav";
import ProfileAvatar from "./ProfileAvatar";

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
	const {
		open,
		variant,
		onClose,
		className,
		auth,
		auth: { userInfo, isLoading },
		dispatch,
		...rest
	} = props;
	const renderProfile = () => {
		switch (userInfo) {
			case null:
			case false:
				return;
			default:
				return (
					<ProfileAvatar
						displayName={userInfo.name}
						pictureURL={userInfo.pictureURL}
					/>
				);
		}
	};

	// const { name, pictureURL } = auth;
	const classes = useStyles();
	const dynamicNavPage = () => {
		switch (userInfo) {
			case null:
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

	const navPages = isLoading
		? []
		: [
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
				{renderProfile()}
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
