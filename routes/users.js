import express from 'express';
const router = express.Router();


import {userinfo} from '../controller/userController.js';

// show user tab
const userInfo = router.get('/info/:id/:type', userinfo);

export default router;