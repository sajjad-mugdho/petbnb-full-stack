import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post('/signup', AuthController.createUser);
router.post('/login', AuthController.loginUser);
router.post('/signup-host', AuthController.createHost);
router.post('/login-host', AuthController.loginHost);
router.post('/refresh-token', AuthController.refreshToken);

export const UsersRoute = router;
