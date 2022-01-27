import express from 'express';
const router = express.Router();


import {userinfo, newuser, userreset} from '../controller/userController.js';

// show user tab
const userInfo = router.get('/info/:id', userinfo);

// reset user tab
const userReset = router.get('/reset/:id', userreset);

// create new user
const addUser = router.post('/new', newuser);

/*
// add new users
router.post('/new', async (req, res, next) => {
	try {
		let user =  await userModel.find({'name': req.body.name});
		
		if (user.length) {
			res.json({
				'code': 0,
				'msg': 'User exists'
			})
		} else {
			user = await userModel.create({
				'name': req.body.name
			});
			
			res.json({
				'code': 1,
				'msg': 'Done!'
			});
		}
	} catch (e) {
		console.log(e)
	}
});
*/
export default router;