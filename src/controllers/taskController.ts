import { Request, Response } from 'express';
import { getTasks } from '../models/task';

export const getFilteredTasks = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { filter } = req.query; // can be 'all', 'completed', or 'pending'

  try {
    const tasks = await getTasks(parseInt(userId), filter as string);
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching tasks', error });
  }
};
