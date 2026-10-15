import { app } from './src/server';

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`Server running in port:${port}`);
});

// Graceful shutdown
process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => process.exit(0));
});
