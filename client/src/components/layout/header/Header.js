import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import {
	AppBar,
	Toolbar,
	Hidden,
	IconButton,
	Typography,
	Icon
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
	root: { boxShadow: "none" },
	flexGrow: {
		flexGrow: 1
	}
}));

const Header = props => {
	const { className, onSideBarOpen, ...rest } = props;
	const classes = useStyles();

	return (
		<AppBar {...rest} className={clsx(classes.root, className)}>
			<Toolbar>
				<RouterLink to="/">
					<Typography variant="h4">CalCal</Typography>
				</RouterLink>
				<div className={classes.flexGrow} />
				<Hidden lgUp>
					<IconButton color="inherit" onClick={onSideBarOpen}>
						<MenuIcon />
					</IconButton>
				</Hidden>
			</Toolbar>
		</AppBar>
	);
};

Header.propTypes = {};

export default Header;
