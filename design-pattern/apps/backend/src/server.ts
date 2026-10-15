import express from 'express';
import helmet from 'helmet';
import { notificationRouter } from './routes/notification.routes';
import { settingsRouter } from './routes/settings.routes';

export const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/notifications', notificationRouter);
app.use('/settings', settingsRouter);
