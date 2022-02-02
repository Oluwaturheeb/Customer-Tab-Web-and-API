import express from 'express';
import {newitem, updateitem, download} from '../controller/itemController.js';
const router = express.Router();

const newItem = router.post('/new', newitem);
const updateItem = router.post('/update', updateitem);
const downloadApk = router.get('/download', download);
export default router;