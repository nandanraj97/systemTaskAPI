import { Request, Response } from 'express';
import { registerUser } from '../models/user';

export const register = async (req: Request, res: Response): Promise<Response> => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await registerUser(username, email, password);
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error registering user', error });
  }
};
