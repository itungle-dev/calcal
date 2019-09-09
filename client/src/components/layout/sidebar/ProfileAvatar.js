import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		minHeight: "fit-content"
	},
	avatar: {
		width: 60,
		height: 60
	},
	name: {
		marginTop: theme.spacing(1)
	}
}));

const ProfileAvatar = props => {
	const { displayName, pictureURL, className, ...rest } = props;
	const classes = useStyles();
	return (
		<div {...rest} className={clsx(classes.root, className)}>
			<Avatar
				alt="Person"
				className={classes.avatar}
				component={RouterLink}
				src={pictureURL}
				to="/profile"
			/>
			<Typography className={classes.name} variant="h6">
				{displayName}
			</Typography>
		</div>
	);
};

ProfileAvatar.propTypes = {
	displayName: PropTypes.string,
	pictureURL: PropTypes.string
};

export default ProfileAvatar;
