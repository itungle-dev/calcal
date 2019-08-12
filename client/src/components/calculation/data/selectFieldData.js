export const MACROS_RATIOS = [
	{ value: 0, proteinsRatio: 30, carbsRatio: 45, fatsRatio: 25 },
	{ value: 1, proteinsRatio: 30, carbsRatio: 40, fatsRatio: 30 },
	{ value: 2, proteinsRatio: 35, carbsRatio: 40, fatsRatio: 25 },
	{ value: 3, proteinsRatio: 35, carbsRatio: 45, fatsRatio: 20 },
	{ value: 4, proteinsRatio: 40, carbsRatio: 40, fatsRatio: 20 },
	{ value: 5, proteinsRatio: 40, carbsRatio: 35, fatsRatio: 25 },
	{ value: 6, proteinsRatio: 45, carbsRatio: 30, fatsRatio: 25 },
	{ value: 7, proteinsRatio: 45, carbsRatio: 35, fatsRatio: 20 }
];

export const GOAL_PACE = [
	{ value: 0, label: "Normal", calories: 250, imperial: 0.5, metric: 0.25 },
	{ value: 1, label: "Faster", calories: 500, imperial: 1, metric: 0.5 },
	{ value: 2, label: "Extreme", calories: 1000, imperial: 2, metric: 1 },
	{ value: 3, label: "None", calories: 0, imperial: 0, metric: 0 }
];

export const GOAL_LABELS = [
	{ label: "Maintenance", value: 0 },
	{ label: "Cutting", value: 1 },
	{ label: "Bulking", value: 2 }
];
