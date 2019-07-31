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
	const carbs = Math.round(((percentages[0] / 100) * totalCalories) / 4);
	const proteins = Math.round(((percentages[1] / 100) * totalCalories) / 4);
	const fats = Math.round(((percentages[2] / 100) * totalCalories) / 9);

	return [carbs, proteins, fats];
};

export const macronutrientInCalories = (
	totalCalories,
	percentages = [40, 35, 20]
) => {
	const carbs = Math.round((percentages[0] / 100) * totalCalories);
	const proteins = Math.round((percentages[1] / 100) * totalCalories);
	const fats = Math.round((percentages[2] / 100) * totalCalories);

	return [carbs, proteins, fats];
};

export const convertWeightToKilo = pound => {
	const KG_IN_LB = 2.20462262;

	const weightInKilo = Math.round(pound / KG_IN_LB);

	return weightInKilo;
};

export const convertHeightToCm = (inches, feet = 0) => {
	const INCH_IN_CM = 2.54;
	const heightInInches = Number(feet) * 12 + Number(inches);

	const heightInCm = Math.round(heightInInches * INCH_IN_CM);

	return heightInCm;
};
