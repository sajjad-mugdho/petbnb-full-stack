import express from 'express';
import { AuthRoute } from '../modules/auth/auth.routes';
import { AvailableServiceRoute } from '../modules/availableServices/availableServices.routes';
import { HostRoutes } from '../modules/hosts/host.route';
import { ServicesRoutes } from '../modules/services/services.routes';
import { UserRoutes } from '../modules/users/users.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    routes: AuthRoute,
  },
  {
    path: '/users',
    routes: UserRoutes,
  },
  {
    path: '/hosts',
    routes: HostRoutes,
  },
  {
    path: '/services',
    routes: ServicesRoutes,
  },
  {
    path: '/Available-Services',
    routes: AvailableServiceRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
