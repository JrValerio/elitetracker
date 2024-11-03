import 'dotenv/config';
import express from 'express';

import { setupMongo } from './database';
import { routes } from './routes';

const app = express();

setupMongo().then(() => {
  app.use(express.json());
  app.use(routes);

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});

export default app;
