import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import uploadRouter from './router/upload.js';
const app = express();

app.use(helmet());
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
  'http://localhost:5173',
];

app.use(
  cors({
    origin: allowedOrigins,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'server is running 🚀',
  });
});

app.use('/api/v1/upload', uploadRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
