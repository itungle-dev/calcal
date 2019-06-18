const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./config/keys");

// Require all models here:
require("./models/User");

// Get all passport services strategy here:
require("./services/passport");

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
const app = express();

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
