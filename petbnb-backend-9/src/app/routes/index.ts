import express from 'express';
import { UsersRoute } from '../modules/users/users.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    routes: UsersRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
