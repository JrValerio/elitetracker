import { Request, Response } from 'express';

import { habitModel } from '../models/habit.model';
export class HabitsController {
  create = async (req: Request, res: Response) => {
    const { name } = req.body;
    const findHabit = await habitModel.model.findOne({ name });
    if (findHabit) {
      return res.status(400).json({ message: '❗ Habit already exists' });
    }

    const newHabit = await habitModel.model.create({
      name,
      completedDates: [],
    });

    res.status(201).json(newHabit);
  };
}
