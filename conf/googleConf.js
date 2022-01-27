import GoogleStragegy from 'passport-google-oauth20';
import mongoose from 'mongoose';
import User from '../models/userModel.js';

const Google = passport => {
	passport.use(new GoogleStragegy({
		clientID: process.env.gID,
		clientSecret: process.env.gSec,
		callbackURL: 'http://localhost:8000/login/google/auth'
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