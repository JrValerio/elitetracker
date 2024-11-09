import dayjs from 'dayjs';
import { Request, Response } from 'express';
import { z } from 'zod';

import { FocusTimeModel } from '../models/focus-time-model';
import { buildValidationErrorMessage } from '../utils/build-validation-error-message-util';

export class FocusTimeController {
  create = async (req: Request, res: Response) => {
    try {
      const schema = z
        .object({
          timeFrom: z.coerce.date(),
          timeTo: z.coerce.date(),
        })
        .parse(req.body);

      const focusTime = await FocusTimeModel.create({
        timeFrom: schema.timeFrom,
        timeTo: schema.timeTo,
      });

      const date = dayjs().toDate();
      console.log(focusTime, date);

      return res.status(201).json({
        success: true,
        data: focusTime,
      });
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: buildValidationErrorMessage(error.issues),
        });
      } else {
        return res.status(500).json({
          success: false,
          error: 'Erro interno do servidor',
        });
      }
    }
  };
}
