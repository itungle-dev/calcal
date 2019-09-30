import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import UnitTabs from "./input_form/UnitTabs";
import DetailForm from "./input_form/DetailForm";
import { CircularProgress } from "@material-ui/core";

const UserForm = props => {
	const {
		tabUnit,
		handleTabChange,
		handleResult,
		calculationOrProfile
	} = props;

	return (
		<div>
			<UnitTabs tabUnit={tabUnit} handleTabChange={handleTabChange} />
			<DetailForm
				onSubmit={handleResult}
				tabUnit={tabUnit}
				calculationOrProfile={calculationOrProfile}
			/>
		</div>
	);
};

UserForm.propTypes = {};

export default UserForm;
