import express from 'express';
import { Request, Response } from 'express';
import * as UC from './user.controller';

const router = express.Router();

router.get('/getAllUsers', (req: Request, res: Response) => UC.(req, res));
router.post('/saveUser', (req: Request, res: Response) => UC.(req, res));
router.delete('/deleteUser/:userId', (req: Request, res: Response) => UC.(req, res));

export default router;