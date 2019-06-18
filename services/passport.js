const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
	console.log("in side serialize", user);
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	console.log("inside deserialize", id);
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback",
			proxy: true
		},
		async (accessToken, refreshToken, profile, done) => {
			console.log(profile);
			const existingUser = await User.findOne({ googleId: profile.id });

			if (existingUser) {
				// already have record with existing profile id
				console.log("already have user");
				console.log(existingUser);
				done(null, existingUser);
			} else {
				console.log("user does not exist");
				// dont have a record with profile id
				const user = await new User({
					googleId: profile.id,
					name: profile.displayName
				}).save();
				done(null, user);
			}
		}
	)
);
