import app from './app';

const { PORT = 9000 } = process.env;

const serverHost = '0.0.0.0';

// Start server
app.listen(PORT as number, serverHost, () =>
  console.log(`\nServer is running on http://localhost:${PORT}/api/v1/docs ...\n`),
);

export default app;
