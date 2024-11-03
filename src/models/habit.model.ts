import { Schema, model } from 'mongoose';

const HabitSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    completedDates: {
      type: [Date],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export const habitModel = {
  name: 'Habit',
  schema: HabitSchema,
  model: model('Habit', HabitSchema),
};
