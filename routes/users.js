import express from 'express';
const router = express.Router();


import {userinfo, newuser, userreset} from '../controller/userController.js';

// show user tab
const userInfo = router.get('/info/:id', userinfo);

// reset user tab
const userReset = router.get('/reset/:id', userreset);

// create new user
const addUser = router.post('/new', newuser);

export default router;