import GoogleStragegy from 'passport-google-oauth20';

const Google = passport => {
	passport.use(new GoogleStragegy({
		clientID: process.env.gID,
		clientSecret: process.env.gSec,
		callbackURL: 'http://'+ process.env.domain +'/login/google/auth'
	}, async (accessToken, refreshToken, profile, done) => {
		console.log(profile);
		done(null, profile)
	}));
	
	passport.serializeUser ((user, done) => {
		done(null, user)
	});
	
	passport.deserializeUser ((user, done) => {
		done (null, user);
	});
}

export default Google;