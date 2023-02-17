import { Router } from 'express';
import authRouter from './auth.routes';
import linkRouter from './link.routes';
import userRouter from "./user.routes";

const router = Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/link', linkRouter);

export default router;

