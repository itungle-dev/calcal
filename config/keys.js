// keys.js: figure out what set of credentials to return
if (process.env.NODE_ENV === "production") {
	// we in production
	module.exports = require("./prod");
} else {
	// we in development
	module.exports = require("./dev");
}
