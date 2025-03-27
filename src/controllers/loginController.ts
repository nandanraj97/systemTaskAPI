import { Request, Response } from 'express';
import { loginUser } from '../models/user';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const token = await loginUser(email, password);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(400).json({ message: 'Invalid credentials', error });
  }
};
