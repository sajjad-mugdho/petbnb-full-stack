import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { AvailableServiceController } from './availableServices.controller';

const router = express.Router();

router.get(
  '/',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.HOST,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.USER
  ),
  AvailableServiceController.getAllAvailableServices
);
router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.HOST,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.USER
  ),
  AvailableServiceController.getAvailableService
);
router.post(
  '/create',
  auth(ENUM_USER_ROLE.HOST),
  AvailableServiceController.insertIntoDB
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.HOST),
  AvailableServiceController.updateAvailableServices
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.HOST, ENUM_USER_ROLE.SUPER_ADMIN),
  AvailableServiceController.deleteAvailableservice
);

export const AvailableServiceRoute = router;
