export const mifflinEquation = (
	gender,
	age,
	weight,
	height,
	activity = 1.2,
	cutCalories = 300,
	bulkCalories = 300
) => {
	const genderNum = gender === "male" ? 5 : -161;

	const basalMetabolicRate = Math.round(
		10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) + genderNum
	);

	const maintenanceDailyCalories = basalMetabolicRate * activity;

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

export const convertWeightToKilo = pound => {
	const KG_IN_LB = 2.20462262;

	const weightInKilo = Math.round(pound / KG_IN_LB);

	return weightInKilo;
};

export const convertHeightToCm = (inches, feet = 0) => {
	const INCH_IN_CM = 2.54;
	console.log("feet", feet);
	console.log("inches", inches);

	const heightInInches = Number(feet) * 12 + Number(inches);

	const heightInCm = Math.round(heightInInches * INCH_IN_CM);

	return heightInCm;
};
