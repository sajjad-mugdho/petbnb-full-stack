import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { ControllerBNB } from './services.controller';

const router = express.Router();

router.get(
  '/',

  ControllerBNB.getServices
);

router.get(
  '/:id',

  ControllerBNB.getServiceById
);
router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ControllerBNB.createService
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ControllerBNB.updateService
);

router.delete(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ControllerBNB.deleteService
);

export const ServicesRoutes = router;
