import { Router } from 'express';
import {
  getEmailSetting,
  putEmailSetting,
} from '../controller/settings.controller';
import { adminAuth } from '../middlewares/admin-auth';

export const settingsRouter = Router();

settingsRouter.use(adminAuth);
settingsRouter.get('/email', getEmailSetting);
settingsRouter.put('/email', putEmailSetting);
