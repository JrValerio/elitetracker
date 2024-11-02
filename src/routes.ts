import { Router, Request, Response } from 'express';

import packageJason from '../package.json';

export const routes = Router();

const habits = [];

routes.get('/', (req: Request, res: Response) => {
  const { name, description, version } = packageJason;

  res.status(200).json({
    name,
    description,
    version,
  });
});

routes.post('/habits', (req: Request, res: Response) => {
  const { name } = req.body;
  const newHabit = { name };

  habits.push(newHabit);

  res.status(201).json(newHabit);
});
