export const mifflinEquation = (gender, age, weight, height) => {
	const genderNum = gender === "male" ? 5 : -161;

	const basalMetabolicRate =
		10 * parseInt(weight) +
		6.25 * parseInt(height) -
		5 * parseInt(age) +
		genderNum;
	return basalMetabolicRate;
};

export const convertWeightToKilo = pound => {
	const KG_IN_LB = 2.20462262;

	const weightInKilo = Math.round(pound / KG_IN_LB);

	return weightInKilo;
};

export const convertHeightToCm = (feet, inches) => {
	const INCH_IN_CM = 2.54;

	const heightInInches = parseInt(feet) * 12 + parseInt(inches);

	const heightInCm = Math.round(heightInInches * INCH_IN_CM);

	return heightInCm;
};
