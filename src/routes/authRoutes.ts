// import { Router } from 'express';
// import { register } from '../controllers/authController';
// import { login } from '../controllers/loginController'

// const router = Router();

// router.post('/register', register);
// router.post('/login', login);


// export default router;


import express, { Request, Response, Router } from 'express';  // Correctly importing express and types
import { loginUser, registerUser } from '../models/user';

const register = async (req: Request, res: Response): Promise<Response> => {
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

const login = async (req: Request, res: Response): Promise<Response> => {
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

const router: Router = express.Router();



router.post('/register', register);
router.post('/login', login);

export default router;
