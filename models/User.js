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
	pictureURL: {
		type: String,
		required: false
	},
	private: {
		type: Boolean,
		default: false
	},
	unitPreference: {
		type: Number,
		default: 0
	},
	age: {
		type: Number
	},
	gender: {
		type: String
	},
	weight: {
		pound: { type: Number },
		kilo: { type: Number }
	},
	height: {
		feet: { type: Number },
		inches: { type: Number },
		cm: { type: Number }
	},
	goal: {
		type: Number,
		default: 0
	},
	goalPace: {
		type: Number,
		default: 0
	},
	activity: {
		type: Number,
		default: 1.2
	},
	macros: {
		type: Number,
		default: 0
	}
});

mongoose.model("users", userSchema);
