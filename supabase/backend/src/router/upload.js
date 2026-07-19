import { Router } from 'express';
import { preSignedUrl, listFiles } from '../controller/upload.js';

const router = Router();

router.get('/list-files', listFiles);
router.post('/pre-signed-url', preSignedUrl);

export default router;
