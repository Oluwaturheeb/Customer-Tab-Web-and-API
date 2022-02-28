import express from 'express';
const router = express.Router();

import index from '../controller/postController.js';
import {downloadPage, download} from '../controller/download.js';

router.get('/', index);
router.get('/download', downloadPage);
router.get('/download-app/:dev', download);

export default router;