const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const User = mongoose.model("users");

module.exports = app => {
	app.post("/api/user/save", requireLogin, async (req, res) => {
		const requestBody = req.body;
		console.log("req.body", req.body);
	});

	app.post("/api/user/profile", requireLogin, async (req, res) => {});
};
