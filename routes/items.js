import express from 'express';
import {newitem, updateitem} from '../controller/itemController.js';
const router = express.Router();

const newItem = router.post('/new', newitem);
const updateItem = router.post('/update', updateitem);

export default router;