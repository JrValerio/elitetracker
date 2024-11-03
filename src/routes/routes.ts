import { Router, Request, Response } from 'express';

import packageJson from '../../package.json';
import { HabitsController } from '../controllers/habits.controller';

export const routes = Router();

const habitsController = new HabitsController();

routes.get('/', (req: Request, res: Response) => {
  const { name, description, version } = packageJson;

  res.status(200).json({
    name,
    description,
    version,
  });
});

routes.get('/habits', (req: Request, res: Response) => {
  habitsController.index(req, res);
});

routes.post('/habits', (req: Request, res: Response) => {
  habitsController.create(req, res);
});

routes.delete('/habits/:id', (req: Request, res: Response) => {
  habitsController.delete(req, res);
});
