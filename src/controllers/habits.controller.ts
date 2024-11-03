import { Request, Response } from 'express';
export class HabitsController {
  private readonly habits = [];
  async create(req: Request, res: Response) {
    const { name } = req.body;
    const newHabit = { name };

    (this.habits as { name: string }[]).push(newHabit);

    res.status(201).json(newHabit);
  }
}
