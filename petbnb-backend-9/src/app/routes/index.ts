import express from 'express';
import { AdminRoutes } from '../modules/admins/admins.routes';
import { AuthRoute } from '../modules/auth/auth.routes';
import { AvailableHostRoutes } from '../modules/availableHost/availableHost.routes';
import { AvailableServiceRoute } from '../modules/availableServices/availableServices.routes';
import { BookingRouter } from '../modules/booking/booking.routes';
import { HostRoutes } from '../modules/hosts/host.route';
import { PaymentRoutes } from '../modules/payment/payment.routes';
import { ProfileRoutes } from '../modules/profile/profile.routes';
import { ServicesRoutes } from '../modules/services/services.routes';
import { timeSlotsRoutes } from '../modules/timeSlot/timeSlots.routes';
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
    path: '/admins',
    routes: AdminRoutes,
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
    path: '/profile',
    routes: ProfileRoutes,
  },
  {
    path: '/available-services',
    routes: AvailableServiceRoute,
  },
  {
    path: '/available-host',
    routes: AvailableHostRoutes,
  },
  {
    path: '/time-slots',
    routes: timeSlotsRoutes,
  },
  {
    path: '/payment',
    routes: PaymentRoutes,
  },
  {
    path: '/bookings',
    routes: BookingRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
