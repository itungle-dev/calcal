export const isRequired = value => {
	return !value ? "Required" : undefined;
};
export const isNumber = value =>
	value && isNaN(Number(value)) ? "Must be a number" : undefined;

export const isNumInRange = (
	value,
	low = 0,
	high = Number.POSITIVE_INFINITY
) => {
	const validNumberMsg =
		high === Number.POSITIVE_INFINITY
			? `greater or equal to ${low}`
			: `between ${low} and ${high}`;
	return value && !(Number(value) >= low && Number(value) <= high)
		? `Number ${validNumberMsg}`
		: undefined;
};

export const isAgeInRange = value => isNumInRange(value, 13, 90);
// const isWeightInRange = value => isNumInRange(value, 1);

export const validate = (values, props) => {
	const { tabUnit } = props;
	let errors = {};
	const requiredFields = [
		"age",
		"gender",
		"weight",
		"heightFt",
		"heightIn",
		"heightCm"
	];

	if (values["weight"]) {
		if (tabUnit === 0) {
			if (
				!(Number(values["weight"]) >= 20 && Number(values["weight"]) <= 2000)
			) {
				errors["weight"] = "Must be a number between 20 and 2000";
			}
		} else {
			if (!(Number(values["weight"]) > 10 && Number(values["weight"]) <= 907)) {
				errors["weight"] = "Must be a number between 10 and 907";
			}
		}
	}

	requiredFields.forEach(field => {
		if (field !== "gender" && values[field]) {
			if (isNumber(values[field])) {
				errors[field] = "Please enter a valid number";
			}
		}

		if (!values[field]) {
			if (
				!(
					(field === "heightIn" && values["heightFt"]) ||
					(field === "heightFt" && values["heightIn"])
				)
			) {
				errors[field] = "Required";
			}
		}
	});

	return errors;
};
