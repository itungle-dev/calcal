import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({}));

const Footer = props => {
	const { className } = props;
	const classes = useStyles();
	return (
		<div className={clsx(classes.root, className)}>
			<Typography gutterBottom variant="caption" color="textSecondary">
				Made by Tungle
			</Typography>
		</div>
	);
};

Footer.propTypes = {};

export default Footer;
