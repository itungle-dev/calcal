import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/styles";
import { useMediaQuery } from "@material-ui/core";

import Header from "./header/Header";
import Footer from "./footer/Footer";
import SideBar from "./sidebar/SideBar";

const useStyles = makeStyles(theme => ({
	root: {
		position: "relative",
		paddingTop: 56,
		height: "calc(100vh - 72px)",
		[theme.breakpoints.up("sm")]: {
			paddingTop: 64,
			height: "calc(100vh - 80px)"
		}
	},
	shiftContent: {
		paddingLeft: 240
	},
	content: {
		padding: theme.spacing(4)
	},
	footer: {
		position: "relative",
		bottom: 0
	}
}));

const Main = props => {
	const { children } = props;
	const classes = useStyles();
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up("lg"), {
		defaultMatches: true
	});

	const [openSideBar, setOpenSideBar] = useState(false);
	const handleSideBarOpen = () => {
		setOpenSideBar(true);
	};

	const handleSideBarClose = () => {
		setOpenSideBar(false);
	};

	const shouldOpenSideBar = isDesktop ? true : openSideBar;

	return (
		<div
			className={clsx({
				[classes.root]: true,
				[classes.shiftContent]: isDesktop
			})}
		>
			<Header onSideBarOpen={handleSideBarOpen} />
			<SideBar
				onClose={handleSideBarClose}
				open={shouldOpenSideBar}
				variant={isDesktop ? "persistent" : "temporary"}
			/>
			<main className={classes.content}>
				{children}
				{/* <Footer className={classes.footer} /> */}
			</main>
		</div>
	);
};

Main.propTypes = {};

export default Main;
