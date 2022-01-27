import express from 'express';
const router = express.Router();

import index from '../controller/postController.js';
router.get('/', index);

export default router;