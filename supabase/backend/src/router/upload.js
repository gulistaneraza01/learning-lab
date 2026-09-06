import { Router } from 'express';
import {
  initiateMultipartUpload,
  listFiles,
  preSignedUrl,
} from '../controller/upload.js';

const router = Router();

router.get('/list-files', listFiles);
router.post('/pre-signed-url', preSignedUrl);
router.post('/initiate-multipart-upload', initiateMultipartUpload);

export default router;
