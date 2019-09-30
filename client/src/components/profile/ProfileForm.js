import React, { Component } from "react";
import PropTypes from "prop-types";
import { reduxForm, formValueSelector, change } from "redux-form";
import { connect } from "react-redux";
import DetailForm from "../calculation/input_form/DetailForm";
import * as validate from "../../utils/validateFields";
import UserForm from "../calculation/UserForm";

class ProfileForm extends Component {
	render() {
		return (
			<div>
				<UserForm
					tabUnit={this.state.tabUnit}
					handleTabChange={this.handleTabChange}
					calculationOrProfile={2}
				/>
			</div>
		);
	}
}

ProfileForm.propTypes = {};

// function mapStateToProps(state) {
// 	// console.log("mapstatetoprops", state);
// 	return {
// 		auth: state.auth
// 	};
// }

// // https://daveceddia.com/redux-mapdispatchtoprops-object-form/
// const mapDispatchToProps = {
// 	change
// };

// ProfileForm = reduxForm({
// 	form: "calForm",
// 	validate: validate.validate,
// 	enableReinitialize: true
// })(ProfileForm);

// export default connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(ProfileForm);
export default ProfileForm;
