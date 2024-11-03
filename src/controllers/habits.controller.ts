import { Request, Response } from 'express';
import { z } from 'zod';

import { habitModel } from '../models/habit.model';
import { createHabitSchema } from '../schemas/schema';
export class HabitsController {
  create = async (req: Request, res: Response) => {
    try {
      const validateData = createHabitSchema.parse(req.body);

      const findHabit = await habitModel.model.findOne(
        { name: validateData.name },
        null,
        { collation: { locale: 'en', strength: 2 } }
      );
      if (findHabit) {
        return res.status(400).json({ message: '❗ Habit already exists' });
      }

      const newHabit = await habitModel.model.create({
        name: validateData.name,
        completedDates: [],
        frequency: validateData.frequency,
        startDate: validateData.startDate,
        description: validateData.description,
      });

      return res.status(201).json({
        sucess: true,
        data: {
          name: newHabit.name,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: {
            issues: error.errors.map((err) => {
              if (
                err.code === 'invalid_type' &&
                'expected' in err &&
                'received' in err
              ) {
                return {
                  code: err.code,
                  expected: err.expected,
                  received: err.received,
                  path: err.path,
                  message: err.message,
                };
              }
              return {
                code: err.code,
                path: err.path,
                message: err.message,
              };
            }),
            name: 'ZodError',
          },
        });
      }
      return res.status(500).json({ message: '❗ Internal Server Error' });
    }
  };
}
