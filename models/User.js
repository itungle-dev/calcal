const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	googleId: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: false
	},
	private: {
		type: Boolean,
		default: false
	},
	age: {
		type: Number
	},
	gender: {
		type: String
	},
	weight: {
		imperial: {},
		metric: {}
	},
	height: {
		imperial: {},
		metric: {}
	},
	goal: {
		type: String
	},
	goalPace: {
		type: String
	},
	activity: {
		type: Number
	},
	macrosRatio: {
		proteins: {
			type: Number
		},
		carbs: {
			type: Number
		},
		fats: {
			type: Number
		}
	}
});

mongoose.model("users", userSchema);
