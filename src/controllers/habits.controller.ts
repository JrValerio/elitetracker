import { Request, Response } from 'express';
import { z } from 'zod';

import { habitModel } from '../models/habit.model';
import { createHabitSchema } from '../schemas/schema';
import { buildValidationErrorMessage } from '../utils/build-validation-error-message-util';

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
        return res.status(400).json({
          success: false,
          error: {
            message: '❗ Habit already exists',
          },
        });
      }

      const newHabit = await habitModel.model.create({
        name: validateData.name,
        completedDates: [],
        frequency: validateData.frequency,
        startDate: validateData.startDate,
        description: validateData.description,
      });

      return res.status(201).json({
        success: true,
        data: {
          name: newHabit.name,
          completedDates: newHabit.completedDates,
          _id: newHabit._id,
          createdAt: newHabit.createdAt,
          updatedAt: newHabit.updatedAt,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json({
          success: false,
          error: {
            issues: buildValidationErrorMessage(error.issues),
            name: 'zodError',
          },
        });
      }

      return res.status(500).json({
        success: false,
        error: {
          name: 'internalError',
        },
      });
    }
  };
}
