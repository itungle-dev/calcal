import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { List, ListItem, Button, Link, colors } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root: {},
	item: { display: "flex", paddingTop: 0, paddingBottom: 0 },
	button: {
		color: colors.blueGrey[800],
		padding: "10px 8px",
		justifyContent: "flex-start",
		textTransform: "none",
		letterSpacing: 0,
		width: "100%",
		fontWeight: theme.typography.fontWeightMedium
	},
	icon: {
		color: theme.palette.icon,
		width: 24,
		height: 24,
		display: "flex",
		alignItems: "center",
		marginRight: theme.spacing(1)
	},
	active: {
		color: theme.palette.primary.main,
		fontWeight: theme.typography.fontWeightMedium,
		"& $icon": {
			color: theme.palette.primary.main
		}
	}
}));

const CustomNavLink = forwardRef((props, ref) => (
	<div ref={ref}>
		<NavLink {...props} />
	</div>
));

const CustomLink = forwardRef((props, ref) => (
	<div ref={ref}>
		<Link {...props} />
	</div>
));

const SideBarNav = props => {
	const { navPages, className, ...rest } = props;
	const classes = useStyles();
	return (
		<List {...rest} className={clsx(classes.root, className)}>
			{navPages.map(page => {
				const navButtonLink = page.useAnchor ? (
					<Button
						className={classes.button}
						component={CustomLink}
						href={page.href}
					>
						{page.title}
					</Button>
				) : (
					<Button
						activeClassName={classes.active}
						className={classes.button}
						component={CustomNavLink}
						to={page.href}
					>
						{page.title}
					</Button>
				);

				return (
					<ListItem
						className={classes.item}
						disableGutters={true}
						key={page.title}
					>
						{navButtonLink}
					</ListItem>
				);
			})}
		</List>
	);
};

SideBarNav.propTypes = {};

export default SideBarNav;
