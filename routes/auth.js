import express from 'express';
import passport from 'passport';
import {googleRouter, local} from '../controller/authController.js';

const router = express.Router();

router.get('/', local);

router.get('/google', passport.authenticate('google', {
	scope: ['profile']
}));

router.get('/google/auth', passport.authenticate('google', {
	failureRedirect: '/login'
}), (req, res) => {
  res.redirect('/');
});

export default router;