import { Router, Request, Response } from 'express';

import packageJason from '../package.json';
import { HabitsController } from './controllers/habits.controller';

export const routes = Router();

const habitsController = new HabitsController();

routes.get('/', (req: Request, res: Response) => {
  const { name, description, version } = packageJason;

  res.status(200).json({
    name,
    description,
    version,
  });
});

routes.post('/habits', (req: Request, res: Response) => {
  habitsController.create(req, res);
});
