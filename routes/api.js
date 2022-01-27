import express from 'express';
const router = express.Router();

// import controllers
import {userinfo, newuser, userreset} from '../controller/api/userController.js';
import index from '../controller/api/postController.js';
import {newitem, updateitem} from '../controller/api/itemController.js';


// index router
router.get('/:user', index);

// user router
const userInfo = router.get('/user/info/:id', userinfo);
// reset user tab
const userReset = router.get('/user/reset/:id', userreset);
// create new user
const addUser = router.post('/user/new', newuser);

// items router
const newItem = router.post('/item/new', newitem);
const updateItem = router.post('/item/update', updateitem);
export default router;