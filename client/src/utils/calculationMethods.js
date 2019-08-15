export const mifflinEquation = (
	gender,
	age,
	weight,
	height,
	activity = 1.2,
	cutCalories = 250,
	bulkCalories = 250
) => {
	const genderNum = gender === "male" ? 5 : -161;

	const basalMetabolicRate =
		10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) + genderNum;

	const maintenanceDailyCalories = Math.round(basalMetabolicRate * activity);

	const cuttingCalories = maintenanceDailyCalories - cutCalories;
	const bulkingCalories = maintenanceDailyCalories + bulkCalories;

	const calculatedCalories = {
		basalMetabolicRate: basalMetabolicRate,
		basalMetabolicRateWeekly: basalMetabolicRate * 7,
		maintenanceDailyCalories: maintenanceDailyCalories,
		maintenanceWeeklyCalories: maintenanceDailyCalories * 7,
		cuttingDailyCalories: cuttingCalories,
		cuttingWeeklyCalories: cuttingCalories * 7,
		bulkingDailyCalories: bulkingCalories,
		bulkingWeeklyCalories: bulkingCalories * 7
	};

	return calculatedCalories;
};

export const macronutrientInGrams = (
	totalCalories,
	percentages = [40, 35, 20]
) => {
	const proteinsGrams = Math.round(
		((percentages[0] / 100) * totalCalories) / 4
	);
	const carbsGrams = Math.round(((percentages[1] / 100) * totalCalories) / 4);
	const fatsGrams = Math.round(((percentages[2] / 100) * totalCalories) / 9);

	return [proteinsGrams, carbsGrams, fatsGrams];
};

export const macronutrientInCalories = (
	totalCalories,
	percentages = [40, 35, 20]
) => {
	const proteinsCalories = Math.round((percentages[0] / 100) * totalCalories);
	const carbsCalories = Math.round((percentages[1] / 100) * totalCalories);
	const fatsCalories = Math.round((percentages[2] / 100) * totalCalories);

	return [proteinsCalories, carbsCalories, fatsCalories];
};

export const convertWeightToKilo = pound => {
	const KG_IN_LB = 2.20462262;

	const weightInKilo = Math.round(pound / KG_IN_LB);

	return weightInKilo;
};

export const convertHeightToCm = (feet = 0, inches = 0) => {
	const INCH_IN_CM = 2.54;
	const heightInInches = Number(feet) * 12 + Number(inches);

	const heightInCm = Math.round(heightInInches * INCH_IN_CM);

	return heightInCm;
};

export const updateFeetAndInches = (feet, inches) => {
	const INCHES_TO_FEET = 12;
	feet = Number(feet);
	inches = Number(inches);

	const floorFt = Math.floor(feet);
	const leftOverDecimalFt = feet - floorFt;
	let updatedInches = leftOverDecimalFt * 12 + inches;

	let updatedFeet = floorFt + Math.floor(updatedInches / INCHES_TO_FEET);
	updatedInches = Math.round(updatedInches % INCHES_TO_FEET);
	return [updatedFeet, updatedInches];
};
