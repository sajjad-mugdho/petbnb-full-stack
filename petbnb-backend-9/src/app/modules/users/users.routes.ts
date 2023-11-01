import express from 'express';
import { UsersController } from './users.controller';

const router = express.Router();

router.post('/signup', UsersController.createUser);
router.post('/login', UsersController.loginUser);

export const UsersRoute = router;
