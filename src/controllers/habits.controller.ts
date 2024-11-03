import { Request, Response } from 'express';
export class HabitsController {
  create = (req: Request, res: Response) => {
    const { name } = req.body;
    const newHabit = { name };

    res.status(201).json(newHabit);
  };
}
