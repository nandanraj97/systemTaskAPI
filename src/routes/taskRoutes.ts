import { Router } from 'express';
import { getFilteredTasks } from '../controllers/taskController';

const router = Router();

router.get('/:userId/tasks', getFilteredTasks);

export default router;
