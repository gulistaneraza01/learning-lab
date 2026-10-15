import { Router } from 'express';
import { sendNotification } from '../controller/notification.controller';

export const notificationRouter = Router();

notificationRouter.post('/', sendNotification);
