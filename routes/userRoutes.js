const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const User = mongoose.model("users");

module.exports = app => {
	app.put("/api/user/save", requireLogin, async (req, res) => {
		console.log("req.user", req.user);
		try {
			const user = await User.findByIdAndUpdate(req.user._id, req.body, {
				new: true
			});
			res.send(user);
		} catch (err) {
			res.status(422).send(err);
		}
	});

	app.post("/api/user/profile", requireLogin, async (req, res) => {});
};
