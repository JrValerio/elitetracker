import { Request, Response } from 'express';

import { habitModel } from '../models/habit.model';
export class HabitsController {
  create = async (req: Request, res: Response) => {
    const { name } = req.body;
    const newHabit = await habitModel.model.create({
      name,
      completedDates: [],
    });

    res.status(201).json(newHabit);
  };
}
