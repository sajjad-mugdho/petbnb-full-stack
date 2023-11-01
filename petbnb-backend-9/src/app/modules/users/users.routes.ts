import express from 'express';
import { UserController } from './users.controller';

const router = express.Router();

router.get('/', UserController.getUsers);

export const UserRoutes = router;
