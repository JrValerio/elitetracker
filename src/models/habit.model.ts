import { Schema, model } from 'mongoose';

const HabitSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: [Date],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export const HabitModel = {
  name: 'Habit',
  schema: HabitSchema,
  model: model('Habit', HabitSchema),
};
