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
	}
});

mongoose.model("users", userSchema);
