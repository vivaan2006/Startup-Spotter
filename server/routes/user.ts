// routes/user.ts
import { Router, Request, Response } from 'express';
const router = Router();

// GET /api/users
router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'List of users' });
});

// POST /api/users
router.post('/', (req: Request, res: Response) => {
  // handle user creation...
  res.status(201).json({ message: 'User created', data: req.body });
});

export default router;
