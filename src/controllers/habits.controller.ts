import { Request, Response } from 'express';
export class HabitsController {
  private readonly habits: { name: string }[] = [];
  create = (req: Request, res: Response) => {
    const { name } = req.body;
    const newHabit = { name };

    this.habits.push(newHabit);

    res.status(201).json(newHabit);
  };
}
