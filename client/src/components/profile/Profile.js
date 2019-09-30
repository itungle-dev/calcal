import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core";

import UserForm from "../calculation/UserForm";

const useStyles = makeStyles(theme => ({
	root: { padding: theme.spacing(4) }
}));

const Profile = ({ auth: { userInfo, isLoading } }) => {
	const [tabUnit, setUnit] = useState(0);
	const classes = useStyles();
	const handleTabChange = () => {
		if (tabUnit === 0) {
			setUnit(1);
		} else {
			setUnit(0);
		}
	};

	if (isLoading) {
		return null;
	}

	return (
		<div>
			<UserForm
				tabUnit={tabUnit}
				handleTabChange={handleTabChange}
				calculationOrProfile="profile"
			/>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}

export default connect(mapStateToProps)(Profile);
